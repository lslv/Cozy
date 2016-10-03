import React, {Component} from 'react'
import { connect} from 'react-redux'
import { getChores } from '../actions/actions_chores'
import { getUsers } from '../actions/actions_users'
import { getQueue } from '../actions/actions_queues'
import { addCalendar } from '../actions/actions_calendars'
import {bindActionCreators} from 'redux'
import AddChore from './AddChore'
import Chore from './Chore'
import { Accordion, Panel, Button, Collapse, Well } from 'react-bootstrap'
import moment from 'moment'

class ChoreList extends Component {
	constructor(props){
		super(props)
		this.state={
			open:true,
			CLIENT_ID:'503377227577-hhc9agh884ka1tn6ev6abl58lflb9h5t.apps.googleusercontent.com',
			SCOPES: ['https://www.googleapis.com/auth/calendar']
		}
		this.handleAuthResult=this.handleAuthResult.bind(this)
		this.listUpcomingChores=this.listUpcomingChores.bind(this)
		this.checkAuth=this.checkAuth.bind(this)
		this.createNewCalendar=this.createNewCalendar.bind(this)

	}
	componentWillMount(){
	 	Promise.all([this.props.getUsers(), this.props.getChores()])
	 	.then(()=>{
		console.log('users ',this.props.users)
		console.log('chores ',this.props.chores)
		Promise.all(this.props.chores.map((chore)=> this.props.getQueue(chore.id) ))
		.then(()=>{
			console.log(this.props.queues)
			this.checkAuth()
			})
	 	})
	}

	checkAuth() { // Check if current user has authorized this application.
		console.log('checkAuth')
		gapi.auth.authorize(
			{
				'client_id': this.state.CLIENT_ID,
				'scope': this.state.SCOPES.join(' '),
				'immediate': true
			}, this.handleAuthResult)
	}

	handleAuthResult(authResult) { // Handle response from authorization server.
		console.log('handleAuthResult')
		console.log(authResult)
		var authorizeDiv = document.getElementById('authorize-div')
		var makeCalendarButton = document.getElementById('create-button')
		if (authResult && !authResult.error) {
			authorizeDiv.style.display = 'none'
			makeCalendarButton.style.display = 'inline'
			gapi.client.load('calendar', 'v3', this.listUpcomingChores)
		} else {
			authorizeDiv.style.display = 'inline'
			makeCalendarButton.style.display = 'none'
		}
	}

	handleAuthClick(event) { //Initiate auth flow in response to user clicking authorize button.
		console.log('handleAuthClick')
		gapi.auth.authorize(
          {client_id: this.state.CLIENT_ID, scope: this.state.SCOPES, immediate: false},
          this.handleAuthResult)
		return false
	}

	listUpcomingChores() { //list upcoming chores
		console.log('listUpcomingChores')
		//currently have it set to the wrong calendar, also need to filter to see if the  username is included in the chore title
		var request = gapi.client.calendar.events.list({
			'calendarId': 'primary',
			'timeMin': (new Date()).toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 10,
			'orderBy': 'startTime'
		})

		request.execute(function(resp) {
			var events = resp.items
			this.appendPre('Upcoming events:')

			if (events.length > 0) {
				for (var i = 0; i < events.length; i++) {
					var event = events[i]
					var when = event.start.dateTime
					if (!when) {
						when = event.start.date
					}
					this.appendPre(event.summary + ' (' + when + ')')
				}
			} else {
				this.appendPre('No upcoming events found.')
			}

		}.bind(this) )
	}

	//functions invovled in making a calendar
	handleMakeCalendarClick(event){
		gapi.client.load('calendar', 'v3', this.createNewCalendar)
	}

	createNewCalendar(){
		var request = gapi.client.calendar.calendars.insert({
			'summary':'Your Cozy House Calendar',
			'description':'Your Houses Personal Cozy Chore Calendar' //add cutomization later
		})
		request.execute(function(resp){
			console.log(resp)
			this.props.addCalendar({
				calendar_google_id:resp.id,
				houseId: 1 //hardcoded house Id on 1 right now
			})
			this.createCalendarChores(resp)
		}.bind(this))
	}

	createCalendarChores(newCal){
		//RRULE:FREQ=WEEKLY;COUNT=5; recurrence rule
		const {chores} = this.props 
		console.log('creating calendar chores')
		var batchChoreEvents = gapi.client.newBatch()

		let events=[]
		const {queues} = this.props
		const {chore} = this.props
		const {users}= this.props
		events=this.props.chores.map((chore)=>{
			var choreQueue= queues[chore.id]
			var queueInOrder=[ ...choreQueue.slice(chore.user_turn), ...choreQueue.slice(0, chore.user_turn) ]
			return queueInOrder.map((queuePosition,index)=>{
				var choreDate=new Date(moment().day(chore.day))
				var verifyCount=0
				choreDate.setDate(choreDate.getDate()+(7*index)+verifyCount)
				choreDate=(String(choreDate.getFullYear())+'-'+String(choreDate.getMonth()+1)+'-'+String(choreDate.getDate()))
				return   {	'end':{
								'date':choreDate
								},
								'start':{
									'date':choreDate
								},
								'description': 'This is a chore for '+users[queuePosition.userId].user_name, 
								'summary': chore.chore_name+'-'+users[queuePosition.userId].user_name,
							}
			})
		})
		events=[].concat.apply([], events)

		events.forEach((chore)=>{
		//insert attendees field as other users
		console.log(chore)
		let request = gapi.client.calendar.events.insert({
			'calendarId': newCal.id,
			'resource':  chore})
		batchChoreEvents.add(request)
		})
		batchChoreEvents.then((results)=>{
			console.log(results)
		})

		this.inviteHouseMates(newCal)


	}

	inviteHouseMates(newCal){
		//right now just invite your other email address instead of dynamically grabbing the email address from the users in the database
		let request = gapi.client.calendar.acl.insert({
				'calendarId': newCal.id,
				'resource':  {	
								'role':'reader',
								'scope':{
									'type':'user',
									'value':'lsfisher@usc.edu' //hardcoded in a single user
								}}
			})
		request.execute(function(response){
			console.log('response from access control')
			console.log(response)
		})
	}

	appendPre(message) { //Append a pre element to the body containing the given message as its text node.
		var pre = document.getElementById('output')
		var textContent = document.createTextNode(message + '\n')
		pre.appendChild(textContent)
	}



	renderChoreList(){
		return this.props.chores.map( chore => <Chore key={chore.chore_name} chore={chore} />)
	}
	render(){
		return (
			<div>
				<div id="authorize-div">
			        <span>Authorize access to Google Calendar API</span>
			        <br/>
			        <Button id="authorize-button" onClick={ event=>this.handleAuthClick(event)}>
			          Sync Your Google Calendar
			        </Button>
			        <br/>
		        </div>
		        <Button id="create-button" onClick={ event=>this.handleMakeCalendarClick(event)}>
		          Make The Chores Calendar
		        </Button>
				<pre id="output"></pre>
				<Accordion>
					<Panel>
						<AddChore />
					</Panel>
					{this.renderChoreList()}
				</Accordion>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {chores:state.chores, queues:state.queues, users:state.users} //add state infusion there
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getChores, getUsers, getQueue, addCalendar}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreList)
