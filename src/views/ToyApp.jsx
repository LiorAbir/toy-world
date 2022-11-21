import { Component } from 'react'
import { ToyList } from '../cmps/ToyList'
import { toyService } from '../services/toy-service'

export class ToyApp extends Component {
	state = {
		toys: null,
	}

	componentDidMount() {
		this.loadToys()
	}

	async loadToys() {
		try {
			const toys = await toyService.query()
			this.setState({ toys })
		} catch (err) {
			console.log('cannot load toys')
		}
	}

	render() {
		const { toys } = this.state
		return (
			<div className="toy-app">
				<ToyList toys={toys} />
			</div>
		)
	}
}
