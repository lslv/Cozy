import React from 'react'

export default (props) => {
	return (
    <div className='form-group'>
      <label>
        Option
        {props.optionNumber}
      </label>
      <input type='text' className='form-control' placeholder={props.optionNumber} />
    </div>
  )
}
