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
	}

	async componentDidMount() {
		this.loadToy()
	}

	async loadToy() {
		const toyId = this.props.match.params.id
		const toy = toyId
			? await toyService.getById(toyId)
			: toyService.getEmptyToy()
		this.setState({ toy })
		this.checkLabels(toy)
	}

	checkLabels(toy) {
		const labels = this.props.labels
		labels.map((label) => {
			label.isChecked = toy.labels.includes(label.name) ? true : false
		})
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
						this.state.toy.labels = value
					}
					this.checkLabels(this.state.toy)
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
		this.props.updateToy({ ...this.state.toy })
		this.props.history.push('/toy')
	}

	render() {
		const { toy } = this.state
		const { labels } = this.props
		if (!toy) return <div>Loading..</div>

		let inStockStyle = toy.inStock
			? { backgroundColor: 'rgb(100 218 238)' }
			: { backgroundColor: 'white' }

		const toyImg = (
			<div className="img-container">
				<img src={toy.img} alt="toy-img" className="toy-img" />
			</div>
		)
		return (
			<section className="toy-edit">
				{/* {JSON.stringify(toy)} */}
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
					<div className="labels-container flex">
						<h3>Labels:</h3>
						<div>
							{labels.map((label, i) => (
								<label
									className={`label-btn flex ${
										label.isChecked ? 'clicked' : ''
									}`}
									key={label.name + i}
									title={label.name}
								>
									<input
										type="checkBox"
										name="labels"
										value={label.name}
										onChange={this.handleChange}
										checked={label.isChecked}
									/>
									<h4>{label.name}</h4>
								</label>
							))}
						</div>
					</div>
					<label>
						<h3>Is in stock:</h3>
						<label className="check-label flex" style={inStockStyle}>
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
