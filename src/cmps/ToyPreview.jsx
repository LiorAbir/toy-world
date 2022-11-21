import { Component } from 'react'

export class ToyPreview extends Component {
	render() {
		const { toy } = this.props
		const toyStyle = { backgroundImage: `url(https://robohash.org/${toy._id})` }
		return (
			<div className="toy-preview flex" style={toyStyle}>
				<section className="info">
					<h2>{toy.name}</h2>
					<h4>{toy.price}</h4>
					<p>{toy.desc}</p>
				</section>
			</div>
		)
	}
}
