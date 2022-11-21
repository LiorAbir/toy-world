import { ToyPreview } from './ToyPreview'

export function ToyList({ toys }) {
	return (
		<div className="toy-list card-grid main-layout">
			{toys.map((toy) => (
				<ToyPreview key={toy._id} toy={toy} />
			))}
		</div>
	)
}
