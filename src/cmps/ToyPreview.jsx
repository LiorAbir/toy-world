import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
	// const toyStyle = { backgroundImage: `url(https://robohash.org/${toy._id})` }
	return (
		<div className="toy-preview flex">
			<Link className="info flex" to={`/toy/${toy._id}`}>
				<img src={toy.img} alt="toy image" />
				<h3>{toy.name}</h3>
				<h4>Price:{toy.price}</h4>
				{/* <p>{toy.desc}</p> */}
			</Link>
			<section className="actions flex">
				<Link className="btn edit-btn" to={`/toy/edit/${toy._id}`}>
					Edit
				</Link>
				<button
					className="btn remove-btn"
					onClick={() => onRemoveToy(toy._id)}
				>
					Delete
				</button>
			</section>
		</div>
	)
}
