import { Component } from 'react'
import { toyService } from '../services/toy-service'

export class ToyDetails extends Component {
	state = {
		toy: null,
	}

	componentDidMount() {
		this.loadToy()
	}

	// componentDidUpdate(prevProps, PrevState) {
	// 	if (prevProps.match.params.id !== this.props.match.id) {
	// 		this.loadToy()
	// 	}
	// }

	async loadToy() {
		let toyId = this.props.match.params.id
		const toy = await toyService.getById(toyId)
		this.setState({ toy })
	}

	onBack = () => {
		this.props.history.push('/toy')
	}

	render() {
		const { toy } = this.state
		if (!toy) return <div>Loading...</div>
		return (
			<div className="toy-details flex">
				<div className="img-container">
					<img src={toy.img} alt="toy image" />
				</div>
				<div className="info">
					<div className="container">
						<h2>Name:</h2>
						<p> {toy.name}</p>
					</div>
					<div className="container">
						<h2>Price:</h2>
						<p> {toy.price}</p>
					</div>
					<div className="container">
						<h2>Description:</h2>
						<p> {toy.desc}</p>
					</div>
					<div className="container">
						<h2>Is in stock:</h2>
						<p>{toy.inStock ? '✔️' : '❌'} </p>
					</div>
					<div className="container">
						<h2>Labels:</h2>
						{toy.labels.map((label, i) => (
							<p key={label + i}>{label} , </p>
						))}
					</div>
					<div className="container">
						<h2>Created at:</h2>
						<p> {toy.createdAt}</p>
					</div>
				</div>

				<button className="back-btn" onClick={this.onBack}>
					Back to list
				</button>
				{/* <button>Next</button> */}
			</div>
		)
	}
}
//פונקצינ בסרביס במוצאת את האינדקס לפי האיידי ומחזירה את הצעצוע באינדקס הבא
