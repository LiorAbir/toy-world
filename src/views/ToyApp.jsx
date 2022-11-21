import { Component } from 'react'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { toyService } from '../services/toy-service'

export class ToyApp extends Component {
	state = {
		toys: null,
		filterBy: null,
	}

	componentDidMount() {
		this.loadToys()
	}

	async loadToys() {
		try {
			const toys = await toyService.query(this.state.filterBy)
			this.setState({ toys })
		} catch (err) {
			console.log('cannot load toys')
		}
	}

	onRemoveToy = async (id) => {
		try {
			await toyService.remove(id)
			this.loadToys()
		} catch (err) {
			console.log('cannot remove toy')
		}
	}

	onChangeFilter = (filterBy) => {
		this.setState({ filterBy }, this.loadToys)
	}

	render() {
		const { toys } = this.state
		if (!toys) return <div>Loading...</div>
		return (
			<div className="toy-app">
				{/* <div className="main-content flex"> */}
				<ToyFilter onChangeFilter={this.onChangeFilter} />
				<ToyList toys={toys} onRemoveToy={this.onRemoveToy} />
				{/* </div> */}
			</div>
		)
	}
}
