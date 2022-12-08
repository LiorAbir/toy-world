import { userService } from '../../services/user.service'

export function login(credentials) {
	return async (dispatch) => {
		try {
			const user = await userService.login(credentials)
			dispatch({ type: 'SET_USER', user })
		} catch (err) {
			console.log('Cannot login')
		}
	}
}

export function signUp(signupInfo) {
	return async (dispatch) => {
		try {
			const user = await userService.signUp(signupInfo)
			dispatch({ type: 'SET_USER', user })
		} catch (err) {
			console.log('Cannot signup')
		}
	}
}

export function logout() {
	return async (dispatch) => {
		try {
			await userService.signUp(signupInfo)
			const user = null
			dispatch({ type: 'SET_USER', user })
		} catch (err) {
			console.log('Cannot logout')
		}
	}
}
