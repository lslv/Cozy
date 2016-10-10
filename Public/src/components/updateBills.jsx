import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Navbar from './Navbar'
import axios from 'axios'
import _ from 'lodash'

class UpdateBills extends Component{
	constructor(props){
		super(props)

		this.state = {total: null}
		this.updateBills = this.updateBills.bind(this)
	}
	componentWillMount(){
		_.map(this.props.bills, bill => this.state[bill.id] = bill.amount_due_in_cents / 100 )
	}

	updateBills(){
		axios.put('/api/billing/updatebill', {
			id:'1',
			amount: this.state[1] * 100
		})
			.then(res => console.log(res))
			.catch(error => console.log(error))
	}

	render(){
		console.log(this.state)
		return (
			<div>
				<Navbar />
				<h3>Add a new bill</h3>
				<Link to='/createBill'><button>add Bill</button></Link>
				{_.map(this.props.bills, bill => <div key={bill.id}>{bill.bill_name} <input type='number' value={this.state[bill.id]} onChange={event=>this.setState({[bill.id]: event.target.value})} /> </div>)}
				<Link to='/budget'><button>Cancel</button></Link>
				<button onClick={e => this.updateBills()}>Update</button>
			</div>
    )
	}
}
function mapStateToProps({bills}){
	return {bills}
}
export default connect(mapStateToProps)(UpdateBills)
