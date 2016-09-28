import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getChores } from '../actions/actions_chores'
import { getUsers } from '../actions/actions_users'
import { getQueue } from '../actions/actions_queues'
import { bindActionCreators } from 'redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Promise from 'promise'

BigCalendar.setLocalizer(
	BigCalendar.momentLocalizer(moment))


class Calendar extends Component {
	constructor(props){
		super(props)
		this.createEvents=this.createEvents.bind(this)
		this.state={
			events:[]
		}
	}

	componentWillMount() {
		const events=[]
		this.props.getUsers(1)
		.then(()=>{
			this.props.getChores().then(()=>{
				Promise.all(this.props.chores.map((chore)=> this.props.getQueue(chore.id) ))
				.then(()=>{
					this.createEvents()
				})
			})
		})
	}

	createEvents(){
		let events=[]
		const {queues} = this.props
		const {chore} = this.props
		const {users}= this.props
		events=this.props.chores.map((chore)=>{
			var choreQueue= queues[chore.id]
			var queueInOrder=[ ...choreQueue.slice(chore.user_turn), ...choreQueue.slice(0, chore.user_turn) ]
			// console.log('choreId ', chore.id, 'queueInOrder', queueInOrder)
			return queueInOrder.map((queuePosition,index)=>{
				var choreDate=new Date(moment().day(chore.day))
				// var verifyCount=7*1 // this would be a good way too offset, just have to store how many times verified
				var verifyCount=0
				choreDate.setDate(choreDate.getDate()+(7*index)+verifyCount)
				console.log(choreDate)
				return {
					'title' :chore.chore_name + ' - ' +users[queuePosition.userId].user_name,
					'allDay': true,
					'start' : choreDate,
					'end'   : choreDate
				}
			})
		})
		events=[].concat.apply([], events)
		this.setState({events})
		
	}

	render(){
		const {events}=this.state
		if(events.length>0)
			return (
				<div className="calendar">
			      <BigCalendar
			      	popup
			        events={events}
			      />
		  		</div>
	    )
		else{
			return <div></div>
		}
	}
}

function mapStateToProps(state){
	return {chores:state.chores, users:state.users, queues:state.queues } //have not gotten the queue position
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getChores, getUsers, getQueue}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Calendar)



