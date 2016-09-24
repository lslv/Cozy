import React, { Component } from 'react'


export default class PureInput extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.field !== nextProps.field
	}

	render() {
		const { field, ...rest } = this.props
		return <input {...field} {...rest} />
	}
}
