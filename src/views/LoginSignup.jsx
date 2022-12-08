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
		isSignUp: false,
	}

	onLogin = async (ev) => {
		ev.preventDefault()
	}

	render() {
		return (
			<>
				<section className="login-container">
					<h1 className="title">ALREADY HAVE AN ACCOUNT? LOG IN</h1>
					<form className="info-form flex" onSubmit={this.onLogin}>
						<input type="email" placeholder="Enter Username" />
						<input type="password" placeholder="Enter Password" />
						<button className="btn login-btn">SIGN IN</button>
					</form>

					<h1>DON'T HAVE AN ACCOUNT YET? REGISTER NOW</h1>
					<button className="btn signup-btn">CREATE ACCOUNT</button>
				</section>
				<section className="signup-container">
					<h1 className="title">
						DON'T HAVE AN ACCOUNT YET? REGISTER NOW
					</h1>
					<form className="info-form flex">
						<input type="text" placeholder="Full name" />
						<input type="text" placeholder="Username" />
						<input type="email" placeholder="Email" />
						<input type="password" placeholder="Password" />
						<button className="btn signup-up">CREATE ACCOUNT</button>
					</form>

					<h1>ALREADY HAVE AN ACCOUNT? LOG IN</h1>
					<button className="btn signup-btn">SIGN UP</button>
				</section>
				{/* <section className="user-container">
					<h1>name</h1>
				</section> */}
			</>
		)
	}
}
