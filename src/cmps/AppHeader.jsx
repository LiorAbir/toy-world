import { NavLink } from 'react-router-dom'

function _AppHeader() {
	return (
		<header className="app-header flex">
			<div className="content flex">
				<NavLink exact to="/">
					<h2 className="logo" title="home page">
						Toy World
					</h2>
				</NavLink>
				<nav className="main-nav">
					<NavLink to="/toy" title="toy list">
						Toys
					</NavLink>
					<NavLink to={'/toy/edit'}>Add toy</NavLink>
				</nav>
			</div>
		</header>
	)
}

export const AppHeader = _AppHeader
