import { Link } from 'react-router-dom'
import { ReactComponent as Heart } from '../assets/icon/heart.svg'
import { ReactComponent as EmptyHeart } from '../assets/icon/emptyHeart.svg'

export function ToyPreview({
	toy,
	user,
	onRemoveToy,
	onAddToUser,
	onRemoveFromUser,
}) {
	return (
		<div className="toy-preview flex">
			<div className="btn wishlist-btn">
				{/* {user &&
					user.wishlist.map((item) => {
						item._id === toy.id ? (
							<EmptyHeart
								title="Add to wishlist"
								onClick={() => onAddToUser(toy, 'wishlist')}
							/>
						) : (
							<Heart
								title="Remove from wishlist"
								onClick={() => onRemoveFromUser(toy._id, 'wishlist')}
							/>
						)
					})} */}

				{user && user.wishlist.includes(toy) ? (
					<EmptyHeart
						title="Add to wishlist"
						onClick={() => onAddToUser(toy, 'wishlist')}
					/>
				) : (
					<Heart
						title="Remove from wishlist"
						onClick={() => onRemoveFromUser(toy._id, 'wishlist')}
					/>
				)}
			</div>
			<Link className="info flex" to={`/toy/${toy._id}`}>
				<img src={toy.img} alt="toy image" />
				<h3>{toy.name}</h3>
				<h4>Price:{toy.price}</h4>
			</Link>
			{user && user.isAdmin ? (
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
			) : (
				<section className="actions flex">
					<button
						className="btn add-cart"
						onClick={() => onAddToUser(toy, 'cart')}
					>
						Add to cart
					</button>
					<button
						className="btn add-cart"
						onClick={() => onRemoveFromUser(toy._id, 'cart')}
					>
						Remove from cart
					</button>
				</section>
			)}
		</div>
	)
}
