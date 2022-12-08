//DAMMY BACEND
import { storageService } from './storage.service'
const USER_KEY = 'loggedinUser'

//BACKEND
// import { httpService } from './http.service';
// const prmStr = 'auth'

export const userService = {
	login,
	logout,
	signUp,
	getLoggedinUser,
	getById,
}

async function login(credentials) {
	// const user = await httpService.post(`${prmStr}/login`, credentials)
	return _saveLocalUser(user)
}

async function logout() {
	// return await httpService.post(`${prmStr}/logout`)
	sessionStorage.removeItem(USER_KEY)
}

async function signUp(signupInfo) {
	// const user = await httpService.post(`${prmStr}/signup`, signupInfo)
	return _saveLocalUser(user)
}

// async function getById(userId) {
// 	const user = await storageService.get('user', userId)
// 	return user
// }

function getLoggedinUser() {
	var user = sessionStorage.getItem(USER_KEY)
	return JSON.parse(user)
}

function _saveLocalUser(user) {
	sessionStorage.setItem(USER_KEY, JSON.stringify(user))
	return user
}
