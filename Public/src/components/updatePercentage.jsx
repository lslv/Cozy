import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Link } from 'react-router'
import Navbar from './Navbar'



class UpdatePercentage extends Component{
	constructor(props){
		super(props)

		this.state = { total: null }
		this.updatePercentage = this.updatePercentage.bind(this)
	}
	componentWillMount(){
		console.log(this.props.users)
		const total = _.reduce(this.props.users, (result, cur) => result + parseInt(cur.pay_percentage),0)
		this.setState({total})
		return _.map(this.props.users, user => {
			return this.state[user.user_name] = parseInt(user.pay_percentage)
		})
	}
	updatePercentage(e, user){
		let value = parseInt(e.target.value)
		let count = 0
		for (let key in this.state){
			if(key !== 'total') count += this.state[key]
		}
		this.setState({[user.user_name]: value, total: count})
		console.log('total', this.state.total)
	}
	render(){
		console.log(this.state)
		return(
    	<div>
			<Navbar />
			{_.map(this.props.users, (user) =>{

				return(
				<div>
						<p key={user.id}>{user.user_name} <input type="number" value={this.state[user.user_name]} onChange={e=>this.updatePercentage(e, user)} /></p>

				</div>
				)}
			)}
			{}
			<p>Total: {this.state.total}</p>
			<Link to='/budget'><button>Cancel</button></Link>
			<Link to='/budget'><button>Submit</button></Link>
			</div>
		)
	}
}
function mapStateToProps({users}){
	return {users}
}

export default connect(mapStateToProps)(UpdatePercentage)
