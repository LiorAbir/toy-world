//DAMMY BACKEND
import { storageService } from './storage.service.js'
const TOY_KEY = 'toys_DB'
_createToys()

//BACKEND
// import { httpService } from './http.service'
// const prmStr = 'toy'

export const toyService = {
	query,
	getById,
	remove,
	save,
	getEmptyToy,
}

async function query() {
	return storageService.query(TOY_KEY)

	// return await httpService.get(prmStr)
}

async function getById(toyId) {
	return storageService.get(TOY_KEY, toyId)

	// const toy = await httpService.get(`${prmStr}/${toyId}`)
	// return toy
}

async function remove(toyId) {
	return storageService.remove(TOY_KEY, toyId)

	// return await httpService.delete(`${prmStr}/${toyId}`)
}

async function save(toy) {
	if (toy._id) {
		return storageService.put(TOY_KEY, toy)
		// return await httpService.put(`${prmStr}/${toy._id}`, toy)
	} else {
		return storageService.post(TOY_KEY, toy)
		// return await httpService.post(prmStr, toy)
	}
}

function getEmptyToy() {
	return {
		_id: '',
		name: '',
		desc: '',
		price: '',
		labels: [],
		createdAt: '',
		inStock: true,
		img: '',
	}
}

function _createToys() {
	let toys = JSON.parse(localStorage.getItem(TOY_KEY))
	if (!toys || !toys.length) {
		toys = _getToys()
		localStorage.setItem(TOY_KEY, JSON.stringify(toys))
	}
	return toys
}

function _getToys() {
	return [
		{
			_id: 't101',
			name: 'Talking Doll',
			desc: 'hjhjhnjbhjn',
			price: 123,
			labels: ['Doll', 'Baby'],
			createdAt: 1631031801011,
			inStock: true,
		},
		{
			_id: 't102',
			name: 'car',
			desc: 'hjhjhnjbhjn',
			price: 123,
			labels: ['Doll', 'Baby'],
			createdAt: 1631031801011,
			inStock: true,
		},
		{
			_id: 't103',
			name: 'bear',
			desc: 'hjhjhnjbhjn',
			price: 123,
			labels: ['Doll', 'Baby'],
			createdAt: 1631031801011,
			inStock: true,
		},
	]
}
