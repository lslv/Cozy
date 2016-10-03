import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
<<<<<<< 890ac65b08e0065b4a90eb5a927b84b5be99d052
import PieChart from 'react-simple-pie-chart'
import { getUsers } from '../actions/actions_users'
import { getBills } from '../actions/actions_billing'
=======
import { getUsers } from '../actions/actions_users'
>>>>>>> [feature]can see house percentage

class Budget extends Component{
	constructor(props){
		super(props)
<<<<<<< 890ac65b08e0065b4a90eb5a927b84b5be99d052

	}

	componentWillMount(){
		this.props.getUsers(sessionStorage.getItem('house_id'))
		this.props.getBills(sessionStorage.getItem('house_id'))
	}
	render () {

		let total = 0
		let userPercent = sessionStorage.getItem('pay_percentage')
		let devisor = userPercent ? 100 / userPercent : 0

		// 	let array = []
		// 	for (let key in this.props.users){
		// 		array.push(this.props.users[key])
		// 	}
		//
		// let test = array.map(item => {
		// 	if(item.pay_percentage)return {color: '#f00', value: item.pay_percentage}
		// })
		//
		// test = 	[
		// 	{color: '#f00', value: 50},
		// 	{color: '#0f0', value: 50}
		// ]

		return (
      <div>
			<div style={{height: '500px', width: '500px', backgroundColor: 'black' }}>
			<PieChart
			slices={
				{color: '#f00', value: 50},
				{color: '#0f0', value: 50}
			}
			/>
			</div>
			<h2>House Budget</h2>
			<h3>percentages</h3>
			{sessionStorage.getItem('admin') ? <button>edit percentages</button> : console.log('hello user')}
=======
	}
	componentWillMount(){
		this.props.getUsers(sessionStorage.getItem('house_id'))
	}
	render () {
		return (
      <div>
			<h2>House Budget</h2>
			<h3>percentages</h3>
>>>>>>> [feature]can see house percentage
			{(() => {
				let array = []
				for (let key in this.props.users){
					array.push(this.props.users[key])
				}
<<<<<<< 890ac65b08e0065b4a90eb5a927b84b5be99d052
=======
				console.log(this.props.users)
>>>>>>> [feature]can see house percentage
				return array
			})().map(item => <div key={item.user_name}>{`${item.user_name} : ${item.pay_percentage}%`}</div>)
			}
			<br />
      <h3>bill breakdown</h3>
<<<<<<< 890ac65b08e0065b4a90eb5a927b84b5be99d052
			{sessionStorage.getItem('admin') ? <button>edit bills</button> : console.log('hello user')}
			{(() => {
				let array = []
				for (let key in this.props.bills){
					array.push(this.props.bills[key])
				}
				return array
			})().map(bill => {
				total += parseInt(bill.amount_due_in_cents)
				return	<div key={bill.id}>{`${bill.bill_name} Amount : ${bill.amount_due_in_cents / 100}`}</div>
			})
			}

      <h3>Your Monthly Total</h3>
			<div>Total: $ {(total / 100) / devisor}
			</div>
=======
				

      <h3>bill total</h3>
>>>>>>> [feature]can see house percentage
      </div>
    )
	}
}

<<<<<<< 890ac65b08e0065b4a90eb5a927b84b5be99d052
function mapStateToProps({users, bills}){
	return {users, bills}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({getUsers, getBills}, dispatch)
=======
function mapStateToProps({users}){
	return {users}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({getUsers}, dispatch)
>>>>>>> [feature]can see house percentage
}
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
