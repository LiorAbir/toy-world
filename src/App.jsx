import { AppHeader } from './cmps/AppHeader'
import { ToyApp } from './views/ToyApp'

function App() {
	return (
		<div className="main-app">
			<AppHeader />
			<main>
				<ToyApp />
			</main>
		</div>
	)
}

export default App
