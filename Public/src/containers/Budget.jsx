import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from '../actions/actions_users'

class Budget extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		this.props.getUsers(sessionStorage.getItem('house_id'))
	}
	render () {
		return (
      <div>
			<h2>House Budget</h2>
			<h3>percentages</h3>
			{(() => {
				let array = []
				for (let key in this.props.users){
					array.push(this.props.users[key])
				}
				console.log(this.props.users)
				return array
			})().map(item => <div key={item.user_name}>{`${item.user_name} : ${item.pay_percentage}%`}</div>)
			}
			<br />
      <h3>bill breakdown</h3>
				

      <h3>bill total</h3>
      </div>
    )
	}
}

function mapStateToProps({users}){
	return {users}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({getUsers}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Budget)
