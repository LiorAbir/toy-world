import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Heart } from '../assets/icon/heart.svg'
import { ReactComponent as EmptyHeart } from '../assets/icon/emptyHeart.svg'

export class ToyPreview extends Component {
	state = {
		isInCart: false,
		isInWishlist: false,
	}

	componentDidMount() {
		this.checkInCart()
		this.checkInWishlist()
	}

	checkInWishlist() {
		const user = this.props.user
		if (user) {
			user.wishlist.map((item) => {
				if (item._id === this.props.toy._id) {
					this.setState({ isInWishlist: true })
					return
				}
			})
		}
	}

	checkInCart() {
		const user = this.props.user
		if (user) {
			user.cart.map((item) => {
				if (item._id === this.props.toy._id) {
					this.setState({ isInCart: true })
					return
				}
			})
		}
	}

	onRemove = (id, category) => {
		this.props.onRemoveFromUser(id, category)
		this.setCategory(category)
	}

	onAdd(toy, category) {
		this.props.onAddToUser(toy, category)
		this.setCategory(category)
	}

	setCategory(category) {
		if (category === 'wishlist') {
			this.setState({ isInWishlist: !this.state.isInWishlist })
		} else {
			this.setState({ isInCart: !this.state.isInCart })
		}
	}

	render() {
		const { user, toy, onRemoveToy } = this.props
		const { isInWishlist, isInCart } = this.state
		return (
			<div className="toy-preview flex">
				<div className="btn wishlist-btn">
					{isInWishlist ? (
						<Heart
							title="Remove from wishlist"
							onClick={() => this.onRemove(toy._id, 'wishlist')}
						/>
					) : (
						<EmptyHeart
							title="Add to wishlist"
							onClick={() => this.onAdd(toy, 'wishlist')}
						/>
					)}
				</div>
				<Link className="info flex" to={`/toy/${toy._id}`}>
					<img src={toy.img} alt="toy image" />
					<h3>{toy.name}</h3>
					<h4>Price:{toy.price}</h4>
				</Link>
				{user && user.isAdmin ? (
					<section className="actions flex">
						<Link className="btn edit-btn" to={`/toy/edit/${toy._id}`}>
							Edit
						</Link>
						<button
							className="btn remove-btn"
							onClick={() => onRemoveToy(toy._id)}
						>
							Delete
						</button>
					</section>
				) : (
					<section className="actions flex">
						{isInCart ? (
							<button
								className="btn add-cart"
								onClick={() => this.onRemove(toy._id, 'cart')}
							>
								Remove from cart
							</button>
						) : (
							<button
								className="btn add-cart"
								onClick={() => this.onAdd(toy, 'cart')}
							>
								Add to cart
							</button>
						)}
					</section>
				)}
			</div>
		)
	}
}
