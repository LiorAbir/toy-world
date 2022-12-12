import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToyList } from '../cmps/ToyList'
import { addToUser, removeFromUser } from '../store/actions/UserAction'

class _UserCart extends Component {
	render() {
		const { loggedInUser, addToUser, removeFromUser } = this.props
		const sumPrice = loggedInUser.cart.reduce((acc, item) => acc + item.price, 0)
		return (
			<div className="cart-container">
				<div>
					<h2>Cart:</h2>
					<h2>Total price:{sumPrice}</h2>
				</div>
				{loggedInUser.cart.length ? (
					<ToyList
						toys={loggedInUser.cart}
						user={loggedInUser}
						onAddToUser={addToUser}
						onRemoveFromUser={removeFromUser}
					/>
				) : (
					<div className="empty">
						<h1>NO TOYS</h1>
					</div>
				)}
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
	addToUser,
	removeFromUser,
}

export const UserCart = connect(mapStateToProps, mapDispatchToProps)(_UserCart)
