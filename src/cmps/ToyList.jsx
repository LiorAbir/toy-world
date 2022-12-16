import { ToyPreview } from './ToyPreview'
import { ReactComponent as TeddyBear } from '../assets/imgs/teddy-bear.svg'

export function ToyList({ toys, user, onRemoveToy, onRemoveFromUser, onAddToUser }) {
	return (
		<div className="toy-list card-grid">
			{!toys || !toys.length ? (
				<div className="no-toys flex">
					<TeddyBear />
					<h2>NO TOYS</h2>
				</div>
			) : (
				toys.map((toy) => (
					<ToyPreview
						key={toy._id}
						toy={toy}
						user={user}
						onRemoveToy={onRemoveToy}
						onRemoveFromUser={onRemoveFromUser}
						onAddToUser={onAddToUser}
					/>
				))
			)}
		</div>
	)
}
