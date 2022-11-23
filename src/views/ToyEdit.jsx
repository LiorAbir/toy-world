import { Component } from 'react'
import AddImg from '../cmps/AddImg'
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
			: toyService.getEmptyToy()
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

	onAddImg = (url) => {
		this.setState((prevState) => ({ toy: { ...prevState.toy, img: url } }))
	}

	onSaveToy = async (ev) => {
		ev.preventDefault()
		if (!this.state.toy.createdAt) {
			this.setState((prevState) => ({
				toy: { ...prevState.toy, createdAt: Date.now() },
			}))
		}
		// await toyService.save({ ...this.state.toy })
		// this.props.history.push('/toy')
	}

	render() {
		const { toy, labels } = this.state
		if (!toy) return <div>Loading..</div>
		const toyImg = (
			<div className="img-container">
				<img src={toy.img} alt="toy-img" className="toy-img" />
			</div>
		)
		return (
			<section className="toy-edit">
				{JSON.stringify(toy)}
				<h1>{toy._id ? 'Edit' : 'Add'} toy:</h1>
				<form onSubmit={this.onSaveToy}>
					{toy.img ? toyImg : <AddImg onAddImg={this.onAddImg} />}
					<label>
						<h3>Name:</h3>
						<input
							type="text"
							name="name"
							value={toy.name}
							onChange={this.handleChange}
							placeholder="Enter toy name"
						/>
					</label>
					<label>
						<h3>Price:</h3>
						<input
							type="number"
							name="price"
							value={toy.price}
							onChange={this.handleChange}
							placeholder="Enter toy price"
							min={0}
						/>
					</label>
					<label>
						<h3>Description:</h3>
						<input
							type="text"
							name="desc"
							value={toy.desc}
							onChange={this.handleChange}
							placeholder="Enter toy description"
						/>
						{/* <div contentEditable>{toy.desc}</div> */}
					</label>
					<label>
						<h3>Labels:</h3>

						{labels.map((label, i) => (
							<div className="labels flex" key={label + i}>
								<input
									type="checkBox"
									name="labels"
									value={label}
									onChange={this.handleChange}
									// checked={toy.labels.map((l) => {
									// 	console.log(l)
									// 	return l === label ? false : true
									// })}
								/>
								<h4>{label}</h4>
							</div>
						))}
					</label>
					<label>
						<h3>Is in stock:</h3>
						<input
							type="checkbox"
							name="inStock"
							value={toy.inStock}
							checked={toy.inStock}
							onChange={this.handleChange}
						/>
					</label>

					<button className="btn save-btn" title="save">
						Save
					</button>
				</form>
			</section>
		)
	}
}
