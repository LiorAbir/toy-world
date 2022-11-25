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
		const labelsFilter = [
			'On wheels',
			'Box game',
			'Art',
			'Baby',
			'Doll',
			'Puzzle',
			'Outdoor',
		]
		return (
			<form className="toy-filter flex main-layout">
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
					<div className="range flex">
						<input
							type="מוצנקר"
							name="price"
							value={price}
							onChange={this.handleChange}
							placeholder="Enter toy price..."
						/>
					</div>
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
						<option value="">option</option>
						<option value="">option</option>
						<option value="">option</option>
					</select>
				</label>

				<label>
					<h3>Is in Stock:</h3>
					<input
						type="checkbox"
						name="inStock"
						value={inStock}
						checked={inStock}
						onChange={this.handleChange}
					/>
				</label>
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
