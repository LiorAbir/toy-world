import { NavLink } from 'react-router-dom'

function _AppHeader() {
	return (
		<header className="app-header flex">
			<div className="content main-layout flex">
				<NavLink exact to="/">
					<h1 className="logo">Toy World</h1>
				</NavLink>
				<nav className="main-nav">
					<NavLink to="/toy">Toys</NavLink>
				</nav>
			</div>
		</header>
	)
}

export const AppHeader = _AppHeader
