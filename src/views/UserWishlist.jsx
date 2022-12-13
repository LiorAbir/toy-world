import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToyList } from '../cmps/ToyList'
import { addToUser, removeFromUser } from '../store/actions/UserAction'

class _UserWishlist extends Component {
	render() {
		const { loggedInUser, addToUser, removeFromUser } = this.props
		return (
			<div className="wishlist-container">
				<h2>Wishlist:</h2>
				{loggedInUser.wishlist.length ? (
					<ToyList
						toys={loggedInUser.wishlist}
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

export const UserWishlist = connect(
	mapStateToProps,
	mapDispatchToProps
)(_UserWishlist)
