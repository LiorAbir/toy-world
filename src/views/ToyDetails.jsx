import { Component } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../store/actions/UserAction'
import { toyService } from '../services/toy-service'

class _ToyDetails extends Component {
	state = {
		toy: null,
	}

	componentDidMount() {
		this.loadToy()
	}

	//פונקציה בסרביס במוצאת את האינדקס לפי האיידי ומחזירה את הצעצוע באינדקס הבא
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

	onAddToUser = async (toy, category) => {
		const user = this.props.loggedInUser
		if (!user) return this.props.history.push('/login')
		user[category].push(toy)
		this.props.updateUser(user)
	}

	onRemoveFromUser = async (toyId, category) => {
		const user = this.props.loggedInUser
		if (!user) return this.props.history.push('/login')
		user[category] = user[category].filter((item) => {
			return item._id !== toyId
		})
		this.props.updateUser(user)
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

				<div className="btns-container flex">
					<button
						className="btn back-btn"
						onClick={this.onBack}
						title="Back"
					>
						Back to list
					</button>
					<button
						className="btn wishlist-btn"
						onClick={() => this.onAddToUser(toy, 'wishlist')}
						title="Add to wishlist"
					>
						Add to wishlist
					</button>
					<button
						className="btn wishlist-btn"
						onClick={() => this.onRemoveFromUser(toy._id, 'wishlist')}
						title="Add to wishlist"
					>
						Remove from wishlist
					</button>
					<button
						className="btn cart-btn"
						onClick={() => this.onAddToUser(toy, 'cart')}
						title="Add to cart"
					>
						Add to cart
					</button>
					<button
						className="btn cart-btn"
						onClick={() => this.onRemoveFromUser(toy._id, 'cart')}
						title="Add to cart"
					>
						Remove from cart
					</button>
				</div>

				{/* <button>Next</button> */}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.userModule.loggedInUser,
	}
}

const mapDispatchToProps = {
	updateUser,
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)
