import { Component } from 'react'
import { toyService } from '../services/toy-service'

export class ToyDetails extends Component {
	state = {
		toy: null,
	}

	async componentDidMount() {
		const toy = await toyService.getById(this.props.match.params.id)
		this.setState({ toy })
	}

	render() {
		const { toy } = this.state
		if (!toy) return <div>Loading...</div>
		return (
			<div className="toy-details flex">
				<div className="info">
					<h1>Name: {toy.name}</h1>
					<h1>Price: {toy.price}</h1>
				</div>
				<img src={`http://robohash.org/${toy._id}`} alt="toy image" />
			</div>
		)
	}
}
