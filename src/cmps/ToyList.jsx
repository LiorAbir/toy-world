import { Component } from 'react'
import { ToyPreview } from './ToyPreview'

export class ToyList extends Component {
	render() {
		const { toys } = this.props
		if (!toys) return <div>Loading...</div>
		return (
			<div className="toy-list card-grid">
				{toys.map((toy) => (
					<ToyPreview key={toy._id} toy={toy} />
				))}
			</div>
		)
	}
}
