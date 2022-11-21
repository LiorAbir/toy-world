import { Component } from 'react'

export class ToyFilter extends Component {
	state = {
		name: '',
		price: '',
		inStock: false,
		labels: [],
		page: 0,
		sort: '',
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
			default:
				value = target.value
		}

		this.setState({ [field]: value }, () => {
			this.props.onChangeFilter({ ...this.state })
		})
	}

	render() {
		const { name, price, inStock, labels, sort } = this.state
		return (
			<form className="toy-filter flex main-layout">
				<input
					type="text"
					name="name"
					value={name}
					onChange={this.handleChange}
					placeholder="Enter toy name..."
				/>
				<input
					type="number"
					name="price"
					value={price}
					onChange={this.handleChange}
					placeholder="Enter toy price..."
				/>

				<select
					name="labels"
					value={labels}
					placeholder="Select labels"
					onChange={this.handleChange}
					multiple
				>
					<option value="">option</option>
					<option value="">option</option>
					<option value="">option</option>
				</select>

				<select
					name="sort"
					value={sort}
					placeholder="Sort by..."
					onChange={this.handleChange}
				>
					<option value="">option</option>
					<option value="">option</option>
					<option value="">option</option>
				</select>

				<input
					type="checkbox"
					name="inStock"
					value={inStock}
					checked={inStock}
					onChange={this.handleChange}
				/>
			</form>
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
