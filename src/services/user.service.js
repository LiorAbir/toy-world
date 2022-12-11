//DAMMY BACEND
import { storageService } from './storage.service'
const USER_KEY = 'loggedinUser'

const USERS_KEY = 'users_DB'
var _gUsers = []
_createUsers()
//BACKEND
// import { httpService } from './http.service';
// const prmStr = 'auth'

export const userService = {
	login,
	logout,
	signUp,
	getLoggedinUser,
}

async function login({ username, password }) {
	const user = _gUsers.find(
		(user) => user.username === username && user.password === password
	)
	console.log(_gUsers, 'users')
	console.log(user)
	return _saveLocalUser(user)
	// const user = await httpService.post(`${prmStr}/login`, credentials)
}

async function logout() {
	sessionStorage.removeItem(USER_KEY)
	// return await httpService.post(`${prmStr}/logout`)
}

async function signUp({ fullName, username, email, password }) {
	const user = {
		_id: _makeId(),
		fullName,
		username,
		email,
		password,
		isAdmin: false,
		cart: [],
		wishList: [],
	}

	_gUsers.push(user)
	_saveLocalUsers(_gUsers)
	return _saveLocalUser(user)
	// const user = await httpService.post(`${prmStr}/signup`, signupInfo)
}

function getLoggedinUser() {
	var user = sessionStorage.getItem(USER_KEY)
	return JSON.parse(user)
}

function _saveLocalUser(user) {
	sessionStorage.setItem(USER_KEY, JSON.stringify(user))
	return user
}

// async function getById(userId) {
// 	const user = await storageService.get('user', userId)
// 	return user
// }
///

function _createUsers() {
	let users = JSON.parse(localStorage.getItem(USERS_KEY))
	if (!users || !users.length) {
		users = _getUsers()
		localStorage.setItem(USERS_KEY, JSON.stringify(users))
	}
	_gUsers = users
	return users
}

function _saveLocalUsers(user) {
	localStorage.setItem(USERS_KEY, JSON.stringify(_gUsers))
	return user
}

function _getUsers() {
	return [
		{
			id: 'user1',
			fullName: 'Lior Abir',
			username: 'liorabir',
			email: 'liorabir@gmail.com',
			password: '123456',
			isAdmin: true,
			cart: [],
			wishList: [],
		},
	]
}

function _makeId(length = 8) {
	var text = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}
