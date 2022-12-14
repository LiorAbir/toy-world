import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink, Route, Switch, Link } from 'react-router-dom'
import { loadLoggedInUser, logout } from '../store/actions/UserAction'

//cmps
import { UserCart } from './UserCart'
import { UserWishlist } from './UserWishlist'
import { UserProfile } from './UserProfile'

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
					<Link className="title" to="/user">
						Hi {loggedInUser.username} !
					</Link>
					<nav className="user-nav flex">
						{loggedInUser.isAdmin === false ? (
							<>
								<NavLink to="/user/cart">Cart</NavLink>
								<NavLink to="/user/wishlist">Wishlist</NavLink>
							</>
						) : (
							''
						)}
						<NavLink exact to="/user">
							Profile
						</NavLink>
					</nav>
				</div>

				<Switch>
					<Route path="/user/wishlist" component={UserWishlist} />
					<Route path="/user/cart" component={UserCart} />
					<Route path="/user" component={UserProfile} />
				</Switch>

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
