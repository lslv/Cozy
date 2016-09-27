import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getChores } from '../actions/actions_chores'
import { getUsers } from '../actions/actions_users'
import { bindActionCreators } from 'redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

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
		this.createEvents()
	}

	createEvents(){
		let events=[]
		this.props.getChores()
		.then(()=>{
			events=this.props.chores.map((chore)=>{
				// console.log(new Date(2016, 9, chore.day))
				console.log(moment().day(1))
				return{
					'title' :chore.chore_name,
					'allDay': true,
					'start' : moment().day(chore.day),
					'end'   : moment().day(chore.day)
				}
			})

			console.log(events)
			this.setState({events})
		})
	}

	render(){
		console.log('rendering')
		console.log()
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
	return {chores:state.chores}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getChores}, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Calendar)




