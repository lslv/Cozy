import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PieChart from 'react-simple-pie-chart'
import { getUsers } from '../actions/actions_users'
import { getBills } from '../actions/actions_billing'

class Budget extends Component{
	constructor(props){
		super(props)
<<<<<<< HEAD
=======

>>>>>>> bills
	}

	componentWillMount(){
		this.props.getUsers(sessionStorage.getItem('house_id'))
		this.props.getBills(sessionStorage.getItem('house_id'))
	}
	render () {
<<<<<<< HEAD
		let total = 0
		let userPercent = sessionStorage.getItem('pay_percentage')
		let devisor = userPercent ? 100 / userPercent : 0
		//PieChart logic
		let array = []
		for (let key in this.props.users){
			array.push(this.props.users[key])
		}
		let test = array.map(item => {
			if(item.pay_percentage)return {color: 'cadetblue', value: parseInt(item.pay_percentage)}
		})

		if(test[0])	test[0].color = '#540D6E'
		if(test[1])	test[1].color = '#EE4266'
		if(test[2])	test[2].color = '#FFD23F'
		if(test[3])	test[3].color = '#3BCEAC'
		if(test[4])	test[4].color = '#0EAD69'

		return (
      <div>
			<div style={{height: '500px', width: '500px', position: 'absolute', right: '0px', padding: '10px' }}>
			<PieChart
			slices={test}
=======

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
>>>>>>> bills
			/>
			</div>
			<h2>House Budget</h2>
			<h3>percentages</h3>
<<<<<<< HEAD
			{sessionStorage.getItem('admin') === 'true' ? <button>edit percentages</button> : console.log('hello user')}
=======
			{sessionStorage.getItem('admin') ? <button>edit percentages</button> : console.log('hello user')}
>>>>>>> bills
			{(() => {
				let array = []
				for (let key in this.props.users){
					array.push(this.props.users[key])
				}
				return array
<<<<<<< HEAD
			})().map((item, index) => <div key={item.user_name}><span style={{color: test[index].color}}>&#9679;</span>{` ${item.user_name} : ${item.pay_percentage}%`}</div>)
			}
			<br />
      <h3>bill breakdown</h3>
			{sessionStorage.getItem('admin') === 'true' ? <button>edit bills</button> : console.log('hello user')}
=======
			})().map(item => <div key={item.user_name}>{`${item.user_name} : ${item.pay_percentage}%`}</div>)
			}
			<br />
      <h3>bill breakdown</h3>
			{sessionStorage.getItem('admin') ? <button>edit bills</button> : console.log('hello user')}
>>>>>>> bills
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
      </div>
    )
	}
}

function mapStateToProps({users, bills}){
	return {users, bills}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({getUsers, getBills}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
