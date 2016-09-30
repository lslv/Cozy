import React, {Component} from 'react'
import { connect} from 'react-redux'
import { getChores } from '../actions/actions_chores'
import { getUsers } from '../actions/actions_users'
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
		this.listUpcomingEvents=this.listUpcomingEvents.bind(this)
		this.checkAuth=this.checkAuth.bind(this)
		this.createNewCalendar=this.createNewCalendar.bind(this)

	}
	componentWillMount(){
		this.props.getUsers(1) //need to pass in houseID and also will call upon successful login, also hardcoded in 1 to get the only house in DB
		this.props.getChores() //eventually need to pass in house ID from local storage
		this.checkAuth()
	}
      
      /**
       * Check if current user has authorized this application.
       */
	checkAuth() {
		console.log('checkAuth')
		gapi.auth.authorize(
			{
				'client_id': this.state.CLIENT_ID,
				'scope': this.state.SCOPES.join(' '),
				'immediate': true
			}, this.handleAuthResult)
	}

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
	handleAuthResult(authResult) {
		console.log('handleAuthResult')
		var authorizeDiv = document.getElementById('authorize-div')
		if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
			authorizeDiv.style.display = 'none'
			this.loadCalendarApi()
		} else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
			authorizeDiv.style.display = 'inline'
		}
	}

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
	handleAuthClick(event) {
		console.log('handleAuthClick')
		gapi.auth.authorize(
          {client_id: this.state.CLIENT_ID, scope: this.state.SCOPES, immediate: false},
          this.handleAuthResult)
		return false
	}

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
	loadCalendarApi() {
		console.log('loadCalendarApi')
		gapi.client.load('calendar', 'v3', this.listUpcomingEvents)
	}

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
	listUpcomingEvents() {
		console.log('listUpcomingEvents')
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

	createNewCalendar(){
		var request = gapi.client.calendar.calendars.insert({
			'summary':'Your Cozy House Calendar',
			'description':'Your Houses Personal Cozy Chore Calendar' //add cutomization later
		})
		request.execute(function(resp){
			console.log(resp)
			this.createCalendarChores(resp)
		}.bind(this))
	}

	createCalendarChores(newCal){
		//RRULE:FREQ=WEEKLY;COUNT=5; recurrence rule
		const {chores} = this.props 
		console.log('creating calendar chores')
		chores.forEach((chore)=>{
			var choreDate=new Date(moment().day(chore.day))
			console.log(choreDate)
			choreDate=(String(choreDate.getFullYear())+'-'+String(choreDate.getMonth()+1)+'-'+String(choreDate.getDate()))
			console.log(newCal.id)
			// console.log(`/calendar/v3/calendars/${newCal.id}/events`)
			//insert attendees field as other users
			let request = gapi.client.calendar.events.insert({
				'calendarId': newCal.id,
				'resource':  {	'end':{
								'date':choreDate
								},
								'start':{
									'date':choreDate
								},
								'description': 'This is a chore', //add customization later
								'summary': chore.chore_name,
								'recurrence':['RRULE:FREQ=WEEKLY']}
			})
			request.execute(function(response){
				console.log(response)
			})

		})

	}


      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
	appendPre(message) {
		var pre = document.getElementById('output')
		var textContent = document.createTextNode(message + '\n')
		pre.appendChild(textContent)
	}

	handleMakeCalendarClick(event){
		gapi.client.load('calendar', 'v3', this.createNewCalendar)
	}


	renderChoreList(){
		return this.props.chores.map( chore => <Chore key={chore.chore_name} chore={chore} />)
	}
	render(){
		return (
			<div>
				<div id="authorize-div">
			        <span>Authorize access to Google Calendar API</span>
		        </div>
		        <br/>
		        <Button id="authorize-button" onClick={ event=>this.handleAuthClick(event)}>
		          Sync Your Google Calendar
		        </Button>
		        <Button id="authorize-button" onClick={ event=>this.handleMakeCalendarClick(event)}>
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
// <button id="authorize-button" onClick={this.handleAuthClick(event)}>

function mapStateToProps(state){
	return {chores:state.chores} //add state infusion there
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getChores, getUsers}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoreList)
