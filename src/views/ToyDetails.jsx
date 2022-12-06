import { Component } from 'react'
import { toyService } from '../services/toy-service'

export class ToyDetails extends Component {
	state = {
		toy: null,
	}

	componentDidMount() {
		this.loadToy()
	}

	componentDidUpdate(prevProps, PrevState) {
		if (prevProps.match.params.id !== this.props.match.id) {
			this.loadToy()
		}
	}

	async loadToy() {
		let toyId = this.props.match.params.id
		const toy = await toyService.getById(toyId)
		this.setState({ toy })
	}

	onBack = () => {
		this.props.history.push('/')
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
				<img src={toy.img} alt="toy image" />

				<button onClick={this.onBack}>Back</button>
				<button>Next</button>
			</div>
		)
	}
}
//פונקצינ בסרביס במוצאת את האינדקס לפי האיידי ומחזירה את הצעצוע באינדקס הבא
