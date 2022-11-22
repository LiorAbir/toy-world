import { NavLink } from 'react-router-dom'

function _AppHeader() {
	return (
		<header className="app-header flex">
			<div className="content flex">
				<NavLink exact to="/">
					{/* <div className="logo flex"> */}
					{/* <img src="../assets/imgs/logo-bear.png" alt="bear" /> */}
					<h2 className="logo">Toy World</h2>
					{/* </div> */}
				</NavLink>
				<nav className="main-nav">
					<NavLink to="/toy">Toys</NavLink>
				</nav>
			</div>
		</header>
	)
}

export const AppHeader = _AppHeader
