import React from 'react'

import { ReactComponent as Instagram } from '../assets/icon/instagram.svg'
import { ReactComponent as Twitter } from '../assets/icon/twitter.svg'
import { ReactComponent as Facebook } from '../assets/icon/facebook.svg'

export function AppFooter() {
	return (
		<footer className="app-footer flex">
			<h1 className="logo">Toy World</h1>
			<p>Copyrigth &#169; 2022 hubSpot, Inc</p>
			<ul className="contact-list clean-list flex">
				<li title="Instagram">
					<Instagram className="icon" />
				</li>
				<li title="Twitter">
					<Twitter className="icon" />
				</li>
				<li title="Facebook">
					<Facebook className="icon" />
				</li>
			</ul>
		</footer>
	)
}
