import { HashRouter as Router, Route, Switch } from 'react-router-dom'

//CMPS
import { AppHeader } from './cmps/AppHeader'
import { ToyApp } from './views/ToyApp'
import { HomePage } from './views/HomePage'
import { ToyDetails } from './views/ToyDetails'
import { ToyEdit } from './views/ToyEdit'

function App() {
	return (
		<Router>
			<div className="main-app">
				<AppHeader />
				<main>
					<Switch>
						<Route path={'/toy/edit/:id?'} component={ToyEdit} />
						<Route path={'/toy/:id'} component={ToyDetails} />
						<Route path={'/toy'} component={ToyApp} />
						<Route path={'/'} component={HomePage} />
					</Switch>
				</main>
				<footer></footer>
			</div>
		</Router>
	)
}

export default App
