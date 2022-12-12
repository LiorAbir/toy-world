import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadLoggedInUser, logout } from '../store/actions/UserAction'

//cmps
import { ToyList } from '../cmps/ToyList'

class _UserDetails extends Component {
	async componentDidMount() {
		this.props.loadLoggedInUser()
	}

	render() {
		const { loggedInUser } = this.props
		if (!loggedInUser) return <Redirect to={'/login'} />
		return (
			<section className="user-details flex">
				<div className="header flex">
					<h1 className="title">Hi {loggedInUser.username} !</h1>
					<nav className="user-nav flex">
						<h1>Cart</h1>
						<h1>Wishlist</h1>
						<h1>Profile</h1>
					</nav>
				</div>
				<div className="cart-container">
					<h2>Cart:</h2>
					{loggedInUser.cart.length ? (
						<ToyList toys={loggedInUser.cart} />
					) : (
						<div className="empty">
							<h1>NO TOYS</h1>
						</div>
					)}
				</div>
				<div className="wishlist-container">
					<h2>Wishlist:</h2>
					{loggedInUser.wishlist.length ? (
						<ToyList toys={loggedInUser.wishlist} />
					) : (
						<div className="empty">
							<h1>empty</h1>
						</div>
					)}
				</div>
				<button className="btn logout-btn" onClick={this.props.logout}>
					Logout
				</button>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.userModule.loggedInUser,
	}
}

const mapDispatchToProps = {
	loadLoggedInUser,
	logout,
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)
