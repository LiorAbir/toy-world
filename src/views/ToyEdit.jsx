import { Component } from 'react'
import { toyService } from '../services/toy-service'

export class ToyEdit extends Component {
	state = {
		toy: null,
	}

	componentDidMount() {
		const toy = toyService.getEmptyToy()
		this.setState({ toy })
	}

	render() {
		const { toy } = this.state
		if (!toy) return <div>Loading..</div>
		return (
			<section className="toy-edit">
				<h1>{toy._id ? 'Edit' : 'Add'}</h1>
				<form>
					<label>
						<h1>Name:</h1>
						<input type="text" />
					</label>
					<label>
						<h1>Price:</h1>
						<input type="number" />
					</label>
					<label htmlFor="">
						<h1>Description:</h1>
						<input type="text" />
						{/* <div contentEditable>{toy.desc}</div> */}
					</label>
					<label htmlFor="">
						<h1>Labels</h1>
						<select name="" id="">
							<option value="">1</option>
						</select>
					</label>
					<label htmlFor="">
						<h1>Created At:</h1>
						<input type="date" />
					</label>
					<label htmlFor="">
						<h1>Is in stock:</h1>
						<input type="checkbox" name="" id="" />
					</label>
				</form>
			</section>
		)
	}
}
