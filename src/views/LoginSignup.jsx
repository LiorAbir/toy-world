import React, { Component } from 'react'

export class LoginSignup extends Component {
	state = {
		credentials: {
			username: '',
			password: '',
		},
		signUpInfo: {
			fullName: '',
			username: '',
			email: '',
			password: '',
		},
		isLogin: true,
	}

	handleChange = ({ target }) => {
		const currPage = this.state.isLogin ? 'credentials' : 'signUpInfo'
		const field = target.name
		let value = target.value

		this.setState((prevState) => ({
			[currPage]: { ...prevState[currPage], [field]: value },
		}))
	}

	onLogin = async (ev) => {
		ev.preventDefault()
		console.log(this.state.credentials)
		// this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: value } }))
	}

	onSignup = async (ev) => {
		ev.preventDefault()
		console.log(this.state.signUpInfo)
		// this.setState((prevState) => ({ toy: { ...prevState.toy, [field]: value } }))
	}

	setSignUp = () => {
		this.setState({ isLogin: !this.state.isLogin })
	}

	render() {
		const { isLogin, credentials, signUpInfo } = this.state
		return (
			<section className="login-signup-container">
				{isLogin ? (
					<>
						<h1 className="title">ALREADY HAVE AN ACCOUNT? LOG IN</h1>
						<form className="info-form flex" onSubmit={this.onLogin}>
							{JSON.stringify(credentials)}
							<input
								type="text"
								name="username"
								value={credentials.username}
								onChange={this.handleChange}
								placeholder="Enter Username"
							/>
							<input
								type="password"
								name="password"
								value={credentials.password}
								onChange={this.handleChange}
								placeholder="Enter Password"
							/>
							<button className="btn login-btn">SIGN IN</button>
						</form>
					</>
				) : (
					<>
						<h1 className="title">
							DON'T HAVE AN ACCOUNT YET? REGISTER NOW
						</h1>
						<form className="info-form flex">
							{JSON.stringify(signUpInfo)}
							<input
								type="text"
								name="fullName"
								value={signUpInfo.fullName}
								onChange={this.handleChange}
								placeholder="Full name"
							/>
							<input
								type="text"
								name="username"
								value={signUpInfo.username}
								onChange={this.handleChange}
								placeholder="Username"
							/>
							<input
								type="email"
								name="email"
								value={signUpInfo.email}
								onChange={this.handleChange}
								placeholder="Email"
							/>
							<input
								type="password"
								name="password"
								value={signUpInfo.password}
								onChange={this.handleChange}
								placeholder="Password"
							/>
							<button
								className="btn signup-up"
								onClick={this.onSignup}
							>
								CREATE ACCOUNT
							</button>
						</form>
					</>
				)}
				<div>
					<h1>
						{isLogin
							? "DON'T HAVE AN ACCOUNT YET? REGISTER NOW"
							: 'ALREADY HAVE AN ACCOUNT? LOG IN'}
					</h1>
					<button className="btn signup-btn" onClick={this.setSignUp}>
						{isLogin ? 'CREATE ACCOUNT' : 'LOGIN'}
					</button>
				</div>
			</section>
		)
	}
}
