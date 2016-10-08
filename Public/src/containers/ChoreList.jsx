import React, {Component} from 'react'
import { connect} from 'react-redux'
import { getChores } from '../actions/actions_chores'
import { getUsers } from '../actions/actions_users'
import { getQueue } from '../actions/actions_queues'
import { addCalendar, getCalendar } from '../actions/actions_calendars'
import {bindActionCreators} from 'redux'
import AddChore from './AddChore'
import Chore from './Chore'
import { Accordion, Panel, Button, Collapse, Well } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import moment from 'moment'

class ChoreList extends Component {
	constructor(props){
		super(props)
		this.state={
			loading:true,
			open:true,
			CLIENT_ID:'503377227577-hhc9agh884ka1tn6ev6abl58lflb9h5t.apps.googleusercontent.com',
			SCOPES: ['https://www.googleapis.com/auth/calendar'],
			makeButtonStyle:{display:'none'},
			authButtonStyle:{display:'none'},
			upcomingEventsStyle:{display:'none'},
			upcomingChores:[]
		}
		this.handleAuthResult=this.handleAuthResult.bind(this)
		this.listUpcomingChores=this.listUpcomingChores.bind(this)
		this.checkAuth=this.checkAuth.bind(this)
		this.createNewCalendar=this.createNewCalendar.bind(this)

	}
	componentWillMount(){
		// console.log('house ID of currently logged in User ', sessionStorage.getItem('house_id'))
		const house_id= sessionStorage.getItem('house_id')
	 	Promise.all([this.props.getUsers(house_id), this.props.getChores(house_id), this.props.getCalendar(house_id)])
	 	.then(()=>{
	 	sessionStorage.setItem('num_of_users', Object.keys(this.props.users).length)
		console.log('users ',this.props.users)
		console.log('chores ',this.props.chores)
		console.log('calendar ', this.props.calendar )
		Promise.all(this.props.chores.map((chore)=> this.props.getQueue(chore.id) ))
		.then(()=>{
			//console.log(this.props.queues)
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
		//console.log(authResult.error)
		// var authorizeDiv = document.getElementById('authorize-div')
		// var makeCalendarButton = document.getElementById('create-button')
		if (authResult && !authResult.error) {
			this.setState({authButtonStyle:{display:'none'}, loading:false} )
			// authorizeDiv.style.display = 'none'
			if(!this.props.calendar){}
				this.setState({makeButtonStyle:{display:'inline'}} )
				//makeCalendarButton.style.display = 'inline'
			if(this.props.calendar){
				//makeCalendarButton.style.display = 'none'
				this.setState({makeButtonStyle:{display:'none'}, upcomingEventsStyle:{display:'inline'}},
				()=> gapi.client.load('calendar', 'v3', this.listUpcomingChores)  )
			}
		} else {
			// authorizeDiv.style.display = 'inline'
			// makeCalendarButton.style.display = 'none'
			console.log('not logged in')
			this.setState({authButtonStyle:{display:'inline'}, loading:false} )
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
			'calendarId': this.props.calendar,
			'timeMin': (new Date()).toISOString(),
			'showDeleted': false,
			'singleEvents': true,
			'maxResults': 10,
			'orderBy': 'startTime'
		})

		request.execute(function(resp) {
			var events = resp.items
			// this.appendPre('Upcoming events:')
			var upcomingEvents=[]
			if (events.length > 0) {
				for (var i = 0; i < events.length; i++) {
					// console.log(events[i])
					if(events[i].summary.includes(sessionStorage.getItem('username'))){ //hardcoded in my username
						var event = events[i]
						var when = event.start.dateTime
						if (!when) {
							when = event.start.date
						}
						upcomingEvents.push(event.summary + ' (' + when + ')')
						// this.appendPre(event.summary + ' (' + when + ')')
					}
				}
			} else {
				upcomingEvents.push('No upcoming chores')
				// this.appendPre('No upcoming events found.')
			}
			this.setState({ upcomingChores: upcomingEvents })

		}.bind(this) )
	}
	renderUpcomingChores(){
		if(this.state.upcomingChores.length)
			return this.state.upcomingChores.map((chore)=> <li key={chore} >{chore}</li>)
		else
			return <li>no events</li>
	}

	// appendPre(message) { //Append a pre element to the body containing the given message as its text node.
	// 	var pre = document.getElementById('output')
	// 	var textContent = document.createTextNode(message + '\n')
	// 	pre.appendChild(textContent)
	// }


	//functions invovled in making a calendar
	handleMakeCalendarClick(event){
		this.setState({makeButtonStyle:{display:'none'}} )
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
				houseId:  sessionStorage.getItem('house_id')//hardcoded house Id on 1 right now
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
				var choreResource=   {	'end':{
								'date':choreDate
								},
								'start':{
									'date':choreDate
								},
								'description': 'This is a chore for '+users[queuePosition.userId].user_name, 
								'summary': chore.chore_name+'-'+users[queuePosition.userId].user_name,
							}
				if(chore.num_of_users===1){
					console.log('personal chore')
					choreResource['recurrence']=['RRULE:FREQ=WEEKLY;']
				}
				return choreResource
			})
		})
		events=[].concat.apply([], events)

		events.forEach((chore)=>{
		//insert attendees field as other users
		//console.log(chore)
		let request = gapi.client.calendar.events.insert({
			'calendarId': newCal.id,
			'resource':  chore})
		batchChoreEvents.add(request)
		})
		batchChoreEvents.then((results)=>{
			//console.log(results)
			this.listUpcomingChores()
		})

		this.inviteHouseMates(newCal)


	}

	inviteHouseMates(newCal){
		//right now just invite your other email address instead of dynamically grabbing the email address from the users in the database
		var batchInvites = gapi.client.newBatch()

		//just for testing right now
		var inviteResources=[{	
									'role':'reader',
									'scope':{
										'type':'user',
										'value':'lsfisher@usc.edu' //hardcoded in a single user
									}}]
		//real production code
		// var inviteResources= [];
		// const {users} = this.props
		// for(var userId in users){
		// 	// console.log(users[userId])
		// 	if(users[userId].user_name !== sessionStorage.getItem('username'))
		// 		inviteResources.push({	
		// 							'role':'reader',
		// 							'scope':{
		// 								'type':'user',
		// 								'value':users[userId].email //hardcoded in a single user
		// 							}})
		// }
		console.log('inviteResources', inviteResources)
		inviteResources.forEach((resource)=>{
		let request = gapi.client.calendar.acl.insert({
				'calendarId': newCal.id,
				'resource':  resource
			})
		batchInvites.add(request)
		})

		batchInvites.then((results)=>{
			console.log(results)
		})
	}


	renderChoreList(){
		return this.props.chores.map( chore => <Chore key={chore.chore_name} chore={chore} />)
	}
	render(){
		if(this.state.loading===true){
			return <img className="spinner" src='/../../cozy_loading.gif' />
		}
		else
			return (
				<div>
					<Navbar />
					<div className="choreList">
				        <Button className="authorizeButton" id="authorize-button" onClick={ event=>this.handleAuthClick(event)} style={this.state.authButtonStyle}>
				          Authorize Google Calendar Access
				        </Button>
				        <Button className="makeCalButton" style={this.state.makeButtonStyle} id="create-button" onClick={ event=>this.handleMakeCalendarClick(event)}>
				          Make Cozy Google Calendar
				        </Button>
				        
						<div className="upcomingChores" style={this.state.upcomingEventsStyle}>
							<h1>Upcoming Chores</h1>
							<a href="https://calendar.google.com/calendar/iphoneselect" target="_blank">Sync Calendar With Phone</a>
							<ul>
							{this.renderUpcomingChores()}
							</ul>
						</div>
						<Accordion>
							<Panel style={{textAlign:'center'}}>
								<AddChore />
							</Panel>
							{this.renderChoreList()}
						</Accordion>
					</div>
				</div>
				)
	}
}
// style={{display:'none' }} 
// <pre id="output"></pre>

function mapStateToProps(state){
	return {chores:state.chores, queues:state.queues, users:state.users, calendar:state.calendar} //add state infusion there
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getChores, getUsers, getQueue, addCalendar, getCalendar}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreList)
