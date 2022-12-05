import { Component } from 'react'
// import { ReactComponent as ToyCar } from '../assets/imgs/toy-car.svg'

export class HomePage extends Component {
	render() {
		return (
			<div className="home-page">
				<div className="hero flex">
					<div className="hero-content">
						<div className="text">
							<h1>Toy World</h1>
							<h3>
								Lorem, ipsum dolor sit amet consectetur adipisicing
								elit.
							</h3>
						</div>
						<button className="btn start-btn">Start Shopping</button>
					</div>
					<div className="empty-div"></div>
					{/* <ToyCar className="hero-img" /> */}
				</div>
			</div>
		)
	}
}
