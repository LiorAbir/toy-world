import { userService } from '../../services/user.service'

export function loadLoggedInUser() {
	return async (dispatch, getState) => {
		try {
			const user = await userService.getLoggedinUser()
			dispatch({ type: 'SET_USER', user })
		} catch (err) {
			console.log('cannot load user')
		}
	}
}

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
			await userService.logout()
			const user = null
			dispatch({ type: 'SET_USER', user })
		} catch (err) {
			console.log('Cannot logout')
		}
	}
}

export function updateUser(newUser) {
	return async (dispatch) => {
		try {
			await userService.updateUser(newUser)
			const user = newUser
			dispatch({ type: 'SET_USER', user })
		} catch (err) {
			console.log('Cannot update user')
		}
	}
}
