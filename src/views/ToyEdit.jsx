import { Component } from 'react'
import { connect } from 'react-redux'
import { updateToy } from '../store/actions/toyActions'

//CMPS
import { AddImg } from '../cmps/AddImg'
import { toyService } from '../services/toy-service'
import { ReactComponent as CheckIcon } from '../assets/icon/check.svg'

class _ToyEdit extends Component {
	state = {
		toy: null,
		// labels: [
		// 	'On wheels',
		// 	'Box game',
		// 	'Art',
		// 	'Baby',
		// 	'Doll',
		// 	'Puzzle',
		// 	'Outdoor',
		// ],
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
				if (field === 'inStock') {
					value = target.checked
				} else if (field === 'labels') {
					value = this.state.toy.labels
					if (target.checked) {
						value.push(target.value)
					} else {
						value = this.state.toy.labels.filter(
							(label) => label !== target.value
						)
					}
				}
				break
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
		this.props.updateToy({ ...this.state.toy })
		this.props.history.push('/toy')
	}

	render() {
		const { toy } = this.state
		const { labels } = this.props
		if (!toy) return <div>Loading..</div>
		let checkedStyle = { backgroundColor: 'white' }
		if (toy.inStock) {
			checkedStyle = { backgroundColor: 'rgb(100 218 238)' }
		}
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
					</label>
					<label className="labels-label flex">
						<h3>Labels:</h3>
						<div>
							{labels.map((label, i) => (
								<label
									className="label-btn flex"
									key={label + i}
									title={label}
								>
									<input
										type="checkBox"
										name="labels"
										value={label}
										onChange={this.handleChange}
									/>
									<h4>{label}</h4>
								</label>
							))}
						</div>
					</label>
					<label>
						<h3>Is in stock:</h3>
						<label className="check-label flex" style={checkedStyle}>
							{toy.inStock ? <CheckIcon /> : ''}

							<input
								type="checkbox"
								name="inStock"
								value={toy.inStock}
								checked={toy.inStock}
								onChange={this.handleChange}
							/>
						</label>
					</label>

					<button className="btn save-btn" title="save">
						Save
					</button>
				</form>
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		toy: null,
		labels: state.toyModule.labels,
	}
}

const mapDispatchToProps = {
	updateToy,
}

export const ToyEdit = connect(mapStateToProps, mapDispatchToProps)(_ToyEdit)
