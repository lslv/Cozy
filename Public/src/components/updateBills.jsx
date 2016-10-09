import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Navbar from './Navbar'
import _ from 'lodash'

class UpdateBills extends Component{
	constructor(props){
		super(props)

	}
	render(){
		console.log(this.props.bills)
		return (
			<div>
				<Navbar />
      	<h1>hello</h1>
				<Link to='/createBill'><button>add Bill</button></Link>
				{_.map(this.props.bills, bill => <div>{bill.bill_name} <input type='number' value={bill.amount_due_in_cents} /> </div>)}
				<Link to='/budget'><button>Cancel</button></Link>
				<Link to='/budget'><button>Update</button></Link>
			</div>
    )
	}
}
function mapStateToProps({bills}){
	return {bills}
}
export default connect(mapStateToProps)(UpdateBills)
