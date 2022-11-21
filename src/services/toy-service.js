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

async function query(filterBy) {
	let toys = await storageService.query(TOY_KEY)
	if (filterBy) {
		const { name, price, inStock, labels, page, sort } = filterBy

		//NAME
		const regexTxt = new RegExp(name, 'i')
		let filteredToys = toys.filter((toy) => regexTxt.test(toy.name))

		//price
		if (price) {
			const regexNum = new RegExp(price, 'i')
			filteredToys = filteredToys.filter((toy) => regexNum.test(toy.price))
		}

		//in stock
		if (inStock) {
			filteredToys = filteredToys.filter((toy) => toy.inStock)
		}

		//labels
		if (labels && labels.length) {
			filteredToys = filteredToys.filter((toy) =>
				labels.some((label) => toy.labels.includes(label))
			)
		}

		//sort
		if (sort && sort.length) {
			const sorted = sort.split(' - ')
			const dir = sorted[1] === 'Increasing' ? 1 : -1
			switch (sorted[0]) {
				case 'Name':
					filteredToys = filteredToys.sort(
						(t1, t2) => t1.name.localeCompare(t2.name) * dir
					)
					break
				case 'Price':
					filteredToys = filteredToys.sort(
						(t1, t2) => (t1.price - t2.price) * dir
					)
					break
				case 'Created':
					filteredToys = filteredToys.sort(
						(t1, t2) => (t1.createdAt - t2.createdAt) * dir
					)
					break
			}
		}

		toys = filteredToys
	}
	// const { name, price, inStock, labels, sort } = filterBy

	// console.log(filteredToys)
	return Promise.resolve([...toys])
	// return filteredToys

	// return storageService.query(TOY_KEY)

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
