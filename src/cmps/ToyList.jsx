import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, user, onRemoveToy, onRemoveFromUser, onAddToUser }) {
	return (
		<div className="toy-list card-grid">
			{toys.map((toy) => (
				<ToyPreview
					key={toy._id}
					toy={toy}
					user={user}
					onRemoveToy={onRemoveToy}
					onRemoveFromUser={onRemoveFromUser}
					onAddToUser={onAddToUser}
				/>
			))}
		</div>
	)
}
