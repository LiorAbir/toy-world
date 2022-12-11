import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

//CMPS
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { ToyApp } from './views/ToyApp'
import { HomePage } from './views/HomePage'
import { ToyDetails } from './views/ToyDetails'
import { ToyEdit } from './views/ToyEdit'
import { LoginSignup } from './views/LoginSignup'
import { UserDetails } from './views/UserDetails'

function App() {
	return (
		<Router>
			<div className="main-app">
				<AppHeader />
				<main>
					<Switch>
						<Route path="/login" component={LoginSignup} />
						<Route path="/user" component={UserDetails} />
						<Route path="/toy/edit/:id?" component={ToyEdit} />
						<Route path="/toy/:id" component={ToyDetails} />
						<Route path="/toy" component={ToyApp} />
						<Route path="/" component={HomePage} />
					</Switch>
				</main>
				<AppFooter />
			</div>
		</Router>
	)
}

export default App
