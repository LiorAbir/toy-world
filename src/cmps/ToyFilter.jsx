import { Component } from 'react'
import { ReactComponent as CheckIcon } from '../assets/icon/check.svg'
import { SearchFilters } from './SearchFilters'

export class ToyFilter extends Component {
	state = {
		filterBy: {
			name: '',
			price: '',
			inStock: false,
			labels: [],
			page: 0,
			sort: '',
		},
		isOpen: false,
	}

	handleChange = ({ target }) => {
		const field = target.name
		let value = target.value

		switch (target.type) {
			case 'checkbox':
				if (field === 'inStock') {
					value = target.checked
				} else if (field === 'labels') {
					value = this.state.filterBy.labels
					if (target.checked) {
						value.push(target.value)
					} else {
						value = this.state.filterBy.labels.filter(
							(label) => label !== target.value
						)
					}
				}
				break
			default:
				value = target.value
		}

		this.setState(
			(prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
			() => {
				this.props.onChangeFilter({ ...this.state.filterBy })
			}
		)
	}

	onHandleChange = ({ name, price }) => {
		this.setState(
			(prevState) => ({ filterBy: { ...prevState.filterBy, name, price } }),
			() => {
				this.props.onChangeFilter({ ...this.state.filterBy })
			}
		)
	}

	setOpen = () => {
		this.setState({ isOpen: this.state.isOpen === false ? true : false })
	}

	render() {
		const { inStock, labels, sort } = this.state.filterBy
		const { isOpen } = this.state
		let modalClass = isOpen ? 'open' : ''
		let checkedStyle = inStock
			? { backgroundColor: 'rgb(100 218 238)' }
			: { backgroundColor: 'white' }
		let clicked = isOpen ? 'clicked' : ''
		const labelsFilter = [
			'On wheels',
			'Box game',
			'Art',
			'Baby',
			'Doll',
			'Puzzle',
			'Outdoor',
		]
		const sortOpt = [
			'Name - Increasing',
			'Price - Increasing',
			'Created - Increasing',
			'Name - Decreasing',
			'Price - Decreasing',
			'Created - Decreasing',
		]

		return (
			<>
				<div className="filter-btn">
					<button className={clicked} onClick={this.setOpen}>
						Search Or Filter
					</button>
				</div>
				<form className={`filter-form flex main-layout ${modalClass}`}>
					<SearchFilters onHandleChange={this.onHandleChange} />

					<label>
						<h3>Search by toy labels:</h3>
						{labelsFilter.map((label, i) => (
							<label
								key={label + i}
								title={label}
								className="flex label-container"
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
					</label>

					<label>
						<h3>Sort by:</h3>
						<select
							name="sort"
							value={sort}
							placeholder="Sort by..."
							onChange={this.handleChange}
						>
							<option value="">Sort</option>
							{sortOpt.map((opt, i) => (
								<option value={opt} key={opt + i}>
									{opt}
								</option>
							))}
						</select>
					</label>

					<label className="check-container">
						<h3>Is in Stock:</h3>
						<label className="check-label flex" style={checkedStyle}>
							{inStock ? <CheckIcon /> : ''}
							<input
								type="checkbox"
								name="inStock"
								value={inStock}
								checked={inStock}
								onChange={this.handleChange}
							/>
						</label>
					</label>
				</form>
			</>
		)
	}
}
