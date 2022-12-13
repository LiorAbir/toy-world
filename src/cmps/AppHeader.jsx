import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { ReactComponent as User } from '../assets/icon/user.svg'

function _AppHeader({ loggedInUser }) {
	return (
		<header className="app-header flex">
			<div className="content flex">
				<NavLink exact to="/">
					<h2 className="logo" title="home page">
						Toy World
					</h2>
				</NavLink>
				<nav className="main-nav flex">
					<NavLink exact to="/toy" title="toy list">
						Toys
					</NavLink>
					{loggedInUser && loggedInUser.isAdmin ? (
						<NavLink to={'/toy/edit'}>Add toy</NavLink>
					) : (
						''
					)}

					<NavLink to={'/login'}>
						<User className="user-btn" title="User" />
					</NavLink>
				</nav>
			</div>
		</header>
	)
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.userModule.loggedInUser,
	}
}

const mapDispatchToProps = {}

export const AppHeader = connect(mapStateToProps)(withRouter(_AppHeader))
