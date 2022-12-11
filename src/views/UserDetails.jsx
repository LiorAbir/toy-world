import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadLoggedInUser, logout } from '../store/actions/UserAction'

class _UserDetails extends Component {
	async componentDidMount() {
		this.props.loadLoggedInUser()
	}

	render() {
		const { loggedInUser } = this.props
		if (!loggedInUser) return <Redirect to={'/login'} />
		return (
			<section className="user-details flex">
				<div>
					<h1>Hi {loggedInUser.username}</h1>
				</div>
				<div className="cart-container">
					<h2>Cart</h2>
					<h1>Empty</h1>
				</div>
				<div className="wishlist-container">
					<h2>Wishlist</h2>
					<h1>Empty</h1>
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
