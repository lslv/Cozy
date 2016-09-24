import React from 'react'

export default (props) => {
	return (
    <div className='form-group'>
	    <label key={props.field}>{field}</label>
	      <input type='text' 
	      value={this.state[field]} 
	      className='form-control'
	      placeholder={field} 
	      onChange={event => this.setState({ [field]: event.target.value })} />
     </div>
  )
}
