import { Component } from 'react'

export class ToyDetails extends Component {
	state = {
		robot: null,
	}

	componentDidMount() {}

	render() {
		const { toy } = this.state
		if (!toy) return <div>Loading...</div>
		return <div className="toy-details"></div>
	}
}
