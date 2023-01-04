import { Component } from 'react'
import { connect } from 'react-redux'
import { addToUser, removeFromUser } from '../store/actions/UserAction'
import { getToyById } from '../store/actions/toyActions'
import { toyService } from '../services/toy-service'

class _ToyDetails extends Component {
	state = {
		toy: null,
		isInCart: false,
		isInWishlist: false,
	}

	async componentDidMount() {
		let toy = await this.loadToy()
		this.checkInCart(toy)
		this.checkInWishlist(toy)
	}

	async loadToy() {
		let toyId = this.props.match.params.id
		const toy = await this.props.getToyById(toyId)
		this.setState({ toy })
		return toy
	}

	async getNextPrevToy(num) {
		const currToyId = this.state.toy._id
		let toy = await this.props.getToyById(currToyId, num)
		this.setState({ toy })
	}

	checkInWishlist(toy) {
		const user = this.props.loggedInUser
		if (user) {
			user.wishlist.map((item) => {
				if (item._id === toy._id) {
					this.setCategory('wishlist')
					return
				}
			})
		}
	}

	checkInCart(toy) {
		const user = this.props.loggedInUser
		if (user) {
			user.cart.map((item) => {
				if (item._id === toy._id) {
					this.setCategory('cart')
					return
				}
			})
		}
	}

	onAddToUser = async (toy, category) => {
		const user = this.props.loggedInUser
		if (!user) return this.props.history.push('/login')
		this.props.addToUser(toy, category)
		this.setCategory(category)
	}

	onRemoveFromUser = async (toyId, category) => {
		const user = this.props.loggedInUser
		if (!user) return this.props.history.push('/login')
		this.props.removeFromUser(toyId, category)
		this.setCategory(category)
	}

	setCategory(category) {
		if (category === 'wishlist') {
			this.setState({ isInWishlist: !this.state.isInWishlist })
		} else {
			this.setState({ isInCart: !this.state.isInCart })
		}
	}

	onBack = () => {
		this.props.history.push('/toy')
	}

	render() {
		const { toy, isInCart, isInWishlist } = this.state
		const { loggedInUser } = this.props
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
						className="btn prev-btn"
						onClick={() => this.getNextPrevToy(-1)}
					>
						Prev
					</button>
					<button
						className="btn back-btn"
						onClick={this.onBack}
						title="Back"
					>
						Back to list
					</button>

					{loggedInUser && loggedInUser.isAdmin ? (
						''
					) : (
						<>
							{isInWishlist ? (
								<button
									className="btn wishlist-btn"
									onClick={() =>
										this.onRemoveFromUser(toy._id, 'wishlist')
									}
									title="Add to wishlist"
								>
									Remove from wishlist
								</button>
							) : (
								<button
									className="btn wishlist-btn"
									onClick={() => this.onAddToUser(toy, 'wishlist')}
									title="Add to wishlist"
								>
									Add to wishlist
								</button>
							)}
							{isInCart ? (
								<button
									className="btn cart-btn"
									onClick={() =>
										this.onRemoveFromUser(toy._id, 'cart')
									}
									title="Add to cart"
								>
									Remove from cart
								</button>
							) : (
								<button
									className="btn cart-btn"
									onClick={() => this.onAddToUser(toy, 'cart')}
									title="Add to cart"
								>
									Add to cart
								</button>
							)}
						</>
					)}
					<button
						className="btn next-btn"
						onClick={() => this.getNextPrevToy(1)}
					>
						Next
					</button>
				</div>
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
	removeFromUser,
	addToUser,
	getToyById,
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)
