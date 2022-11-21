import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
	const toyStyle = { backgroundImage: `url(https://robohash.org/${toy._id})` }
	return (
		<div className="toy-preview flex" style={toyStyle}>
			<Link className="info" to={`/toy/${toy._id}`}>
				<h2>{toy.name}</h2>
				<h4>{toy.price}</h4>
				<p>{toy.desc}</p>
			</Link>
			<section className="actions flex">
				<button className="btn edit-btn">edit</button>
				<button
					className="btn remove-btn"
					onClick={() => onRemoveToy(toy._id)}
				>
					delete
				</button>
			</section>
		</div>
	)
}
