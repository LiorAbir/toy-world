import React, { Component } from 'react'
import { eventBus } from '../services/eventBus-service'

export class UserMsg extends Component {
	state = {
		unsubscribe: null,
		msg: null,
	}

	componentDidMount() {
		this.state.unsubscribe = eventBus.on('show-msg', this.setMsg)
	}

	componentWillUnmount() {
		this.state.unsubscribe()
	}

	setMsg = (msg) => {
		this.setState({ msg: msg })
		setTimeout(() => {
			this.setState({ msg: null })
		}, 2000)
	}

	render() {
		const { msg } = this.state
		return (
			<>
				{msg ? (
					<div className={`user-msg ${msg.type}`}>
						<h2>{msg.txt}</h2>
					</div>
				) : (
					''
				)}
			</>
		)
	}
}
