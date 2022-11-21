import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy }) {
	return (
		<div className="toy-list card-grid main-layout">
			{toys.map((toy) => (
				<ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} />
			))}
		</div>
	)
}
