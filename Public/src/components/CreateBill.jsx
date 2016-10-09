import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default class CreateBill extends Component{
	constructor(props){
		super(props)

		this.state = {billName: '', billPrice: 0}

		this.updateBillName = this.updateBillName.bind(this)
		this.updateBillPrice = this.updateBillPrice.bind(this)
		this.postNewBill = this.postNewBill.bind(this)
	}

	updateBillName(event){
		this.setState({billName: event.target.value})
	}

	updateBillPrice(event){
		this.setState({billPrice: event.target.value})
	}

	postNewBill(e){
		e.preventDefault()
		axios.post('/api/billing/createBill', {
			billname: this.state.billName,
			amount: this.state.billPrice,
			houseId: sessionStorage.getItem('house_id')
		})
    .then(res => console.log(res))
    .catch(error => console.log(error))
	}

	render(){
		return(
      <div>
      <Navbar />
        <form onSubmit={this.postNewBill}>
          <input value={this.state.billName} onChange={event=>this.updateBillName(event)}/>
          <input value={this.state.billPrice} onChange={event=>this.updateBillPrice(event)} type="number" />
          <button type="submit">Add Bill</button>
        </form>
      </div>
    )
	}
}
