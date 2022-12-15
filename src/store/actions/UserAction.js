import { userService } from '../../services/user.service'
import { showErrorMsg, showSuccessMsg } from '../../services/eventBus-service'

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
			showSuccessMsg(`hello ${user.fullName}`)
		} catch (err) {
			showErrorMsg('Cannot login. please try again')
			console.log('Cannot login')
		}
	}
}

export function signUp(signupInfo) {
	return async (dispatch) => {
		try {
			const user = await userService.signUp(signupInfo)
			dispatch({ type: 'SET_USER', user })
			showSuccessMsg(`hello ${user.fullName}`)
		} catch (err) {
			showErrorMsg('Cannot signup. please try again')
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
			showSuccessMsg(`bye bye`)
		} catch (err) {
			showErrorMsg(`Cannot logout. please try again`)
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

export function addToUser(toy, category) {
	return async (dispatch) => {
		try {
			const user = userService.getLoggedinUser()
			user[category].push(toy)
			await userService.updateUser(user)
			dispatch({ type: 'SET_USER', user })
			showSuccessMsg(`Item added successfully to ${category}`)
		} catch (err) {
			showErrorMsg(`Cannot add item to ${category}. please try again`)
			console.log('Cannot update user')
		}
	}
}

export function removeFromUser(toyId, category) {
	return async (dispatch) => {
		try {
			const user = userService.getLoggedinUser()
			user[category] = user[category].filter((item) => {
				return item._id !== toyId
			})
			await userService.updateUser(user)
			dispatch({ type: 'SET_USER', user })
			showSuccessMsg(`Item removed successfully from ${category}`)
		} catch (err) {
			showErrorMsg(`Cannot removed Item from ${category}`)
			console.log('Cannot update user')
		}
	}
}
