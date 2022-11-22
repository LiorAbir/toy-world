import { Component } from 'react'
import { toyService } from '../services/toy-service'

export class ToyEdit extends Component {
	state = {
		toy: null,
		labels: [
			'On wheels',
			'Box game',
			'Art',
			'Baby',
			'Doll',
			'Puzzle',
			'Outdoor',
		],
	}

	async componentDidMount() {
		const toyId = this.props.match.params.id
		const toy = toyId
			? await toyService.getById(toyId)
			: await toyService.getEmptyToy()
		this.setState({ toy })
	}

	handleChange = ({ target }) => {
		const field = target.name
		let value = target.value

		switch (target.type) {
			case 'number':
				value = +target.value || ''
				break
			case 'checkbox':
				value = target.checked
				break
			case 'select-multiple':
				const options = target.options
				// console.log(options)
				value = []
				for (var i = 0; i < options.length; i++) {
					if (options[i].selected) {
						value.push(options[i].value)
					}
				}
				console.log(value)
			default:
				value = target.value
		}

		this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: value } }))
	}

	onSaveToy = async (ev) => {
		ev.preventDefault()
		await toyService.save({ ...this.state.toy })
		this.props.history.push('/toy')
	}

	render() {
		const { toy, labels } = this.state
		if (!toy) return <div>Loading..</div>
		return (
			<section className="toy-edit">
				{JSON.stringify(toy)}
				<h1>{toy._id ? 'Edit' : 'Add'}</h1>
				<form onSubmit={this.onSaveToy}>
					<label>
						<h1>Name:</h1>
						<input
							type="text"
							name="name"
							value={toy.name}
							onChange={this.handleChange}
							placeholder="Enter toy name"
						/>
					</label>
					<label>
						<h1>Price:</h1>
						<input
							type="number"
							name="price"
							value={toy.price}
							onChange={this.handleChange}
							placeholder="Enter toy price"
						/>
					</label>
					<label htmlFor="">
						<h1>Description:</h1>
						<input
							type="text"
							name="desc"
							value={toy.desc}
							onChange={this.handleChange}
							placeholder="Enter toy description"
						/>
						{/* <div contentEditable>{toy.desc}</div> */}
					</label>
					<label htmlFor="">
						<h1>Labels:</h1>
						<select
							name="labels"
							value={toy.labels}
							multiple
							onChange={this.handleChange}
							placeholder="Labels"
						>
							{labels.map((label, i) => (
								<option value={label} key={label + i}>
									{label}
								</option>
							))}
						</select>
					</label>
					<label htmlFor="">
						<h1>Created At:</h1>
						<input type="date" />
					</label>
					<label htmlFor="">
						<h1>Is in stock:</h1>
						<input
							type="checkbox"
							name="inStock"
							value={toy.inStock}
							checked={toy.inStock}
							onChange={this.handleChange}
						/>
					</label>

					<button>Save</button>
				</form>
			</section>
		)
	}
}
