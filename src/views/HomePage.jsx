import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, logout } from '../store/actions/UserAction'
import { ReactComponent as ToyCar } from '../assets/imgs/toy-car.svg'

class _HomePage extends Component {
	EnterAsAdmin = () => {
		this.props.login({
			username: 'liorabir',
			password: '123456',
		})
		this.props.history.push('/user')
	}

	render() {
		return (
			<div className="home-page">
				<div className="hero flex">
					<ToyCar className="hero-img" />
					<div className="hero-content">
						<div className="text">
							<h1 className="logo">ToyWorld</h1>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing
								elit.
							</p>
						</div>
						<div className="btns-container flex">
							{this.props.loggedInUser ? (
								<button className="btn" onClick={this.props.logout}>
									logout
								</button>
							) : (
								<>
									<Link to="/login" className="btn">
										Try as User
									</Link>
									<button
										className="btn start-btn"
										onClick={this.EnterAsAdmin}
									>
										Try as Admin
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		loggedInUser: state.userModule.loggedInUser,
	}
}

const mapDispatchToProps = {
	login,
	logout,
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)
