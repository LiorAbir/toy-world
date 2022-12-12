import React, { Component } from 'react'
import { connect } from 'react-redux'

class _UserProfile extends Component {
	render() {
		const { loggedInUser } = this.props
		return (
			<div className="profile-container">
				<h2>Profile:</h2>
				<h1>Name: {loggedInUser.fullName}</h1>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.userModule.loggedInUser,
	}
}

const mapDispatchToProps = {}

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile)
