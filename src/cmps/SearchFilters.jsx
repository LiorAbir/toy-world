import React, { Component } from 'react'

export class SearchFilters extends Component {
	state = {
		name: '',
		price: '',
	}

	handleChange = ({ target }) => {
		const field = target.name
		let value = target.type === 'number' ? +target.value || '' : target.value

		this.setState({ [field]: value }, () => {
			this.props.onHandleChange({ ...this.state })
		})
	}

	render() {
		const { name, price } = this.state
		return (
			<div className="search-filters">
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
					<h3>Search by price:</h3>
					<input
						type="number"
						name="price"
						value={price}
						onChange={this.handleChange}
						placeholder="Enter toy price..."
					/>
				</label>
			</div>
		)
	}
}
