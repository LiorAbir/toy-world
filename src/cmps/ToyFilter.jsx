import { logDOM } from '@testing-library/react'
import { Component } from 'react'
import { ReactComponent as CheckIcon } from '../assets/icon/check.svg'

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
			case 'number':
				value = +target.value || ''
				break
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

	setOpen = () => {
		this.setState({ isOpen: this.state.isOpen === false ? true : false })
	}

	render() {
		const { name, price, inStock, labels, sort } = this.state.filterBy
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
					<label>
						<h3>Search by toy name:</h3>
						<input
							type="text"
							name="name"
							value={name}
							onChange={this.handleChange}
							placeholder="Enter toy name..."
						/>
					</label>

					<label>
						<h3>Search by price range:</h3>
						{/* <div className="number flex"> */}
						<input
							type="number"
							name="price"
							value={price}
							onChange={this.handleChange}
							placeholder="Enter toy price..."
						/>
						{/* </div> */}
					</label>

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

					<label>
						<h3>Is in Stock:</h3>
						<label className="Check-label flex" style={checkedStyle}>
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

// sortOpt: [
//   'Name - Increasing',
//   'Price - Increasing',
//   'Created - Increasing',
//   'Name - Decreasing',
//   'Price - Decreasing',
//   'Created - Decreasing',
// ],
