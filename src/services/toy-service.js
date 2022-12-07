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

	return Promise.resolve([...toys])
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
			name: 'Rubiks cube',
			price: 15,
			desc: 'Rubiks cube',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670417043/61KHI8RTgVL._SL1500__nwufwk.jpg',
			labels: ['Puzzle'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't102',
			name: 'Cars',
			price: 45,
			desc: '4 little cars',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416984/61SFnDl6jQL._SX355__gcbgxr.jpg',
			labels: ['On wheels', 'Baby'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't103',
			name: 'Barbie',
			price: 30,
			desc: 'Barbie with little dog',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416951/barbie_with_dog_dt22j3.jpg',
			labels: ['Doll'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't104',
			name: 'Barbie',
			price: 35,
			desc: 'Barbie on wheels chair',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416896/barbie-doll-and-accessory_gvpu7h.jpg',
			labels: ['Doll'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't105',
			name: 'Barbie',
			price: 32,
			desc: 'Barbie with horse and hat',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416861/barbieWithHorse_h8xco1.jpg',
			labels: ['Doll'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't106',
			name: 'Ball',
			price: 10,
			desc: 'Beach ball',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416793/beachBall_c2adqo.jpg',
			labels: ['Outdoor'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't107',
			name: 'Monopoly',
			price: 56,
			desc: 'Monopoly box game',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416761/c4901f5c7322b03ddfbc074867f39388_bkfhtg.jpg',
			labels: ['Box game'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't108',
			name: 'Car',
			price: 180,
			desc: 'Car',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416730/CarOutside_ix81hj.jpg',
			labels: ['On wheels', 'Outdoor', 'Baby'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't109',
			name: 'Remote car',
			price: 67,
			desc: 'Remote car',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416681/carRemote_wrhrun.jpg',
			labels: ['On wheels'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't110',
			name: 'Dog',
			price: 46,
			desc: 'Dog doll',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416644/DogBaby_syizbj.webp',
			labels: ['Baby'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't111',
			name: 'Slide',
			price: 15,
			desc: 'Slide for babies',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416605/GUEST_6cdd9234-072b-40df-b9b4-f0649128ad55_ks5ixl.jpg',
			labels: ['Out door'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't112',
			name: 'Connect',
			price: 35,
			desc: 'Connect box game',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416573/GUEST_d86c944e-f500-4967-8810-4bec7d71df86_ikbitk.jpg',
			labels: ['Box game'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't113',
			name: 'Horse swing',
			price: 100,
			desc: 'Horse swing',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416535/HorseBaby_ghlnjp.webp',
			labels: ['Outdoor', 'Baby'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't114',
			name: 'Pencils',
			price: 15,
			desc: 'Gray pencils',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416503/pencils_w3pjey.webp',
			labels: ['Art'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't115',
			name: 'Puzzle',
			price: 56,
			desc: 'Puzzle box game',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416473/pokemon-allstars-jigsaw-puzzle-5000-pieces.91808-2.fs_juosdh.jpg',
			labels: ['Puzzle', 'Box game'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't116',
			name: 'Junior rings',
			price: 24,
			desc: '5 rings in colors',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416438/RingsBaby_kavehg.jpg',
			labels: ['Baby'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't117',
			name: 'Guss who',
			price: 15,
			desc: 'Guss who box game',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416380/S304910_4_s6iylc.jpg',
			labels: ['Box game'],
			createdAt: Date.now(),
			inStock: true,
		},
		{
			_id: 't118',
			name: 'Track',
			price: 60,
			desc: 'Track with 6 little cars',
			img: 'https://res.cloudinary.com/lior-cloud/image/upload/v1670416329/Track_ney4y3.jpg',
			labels: ['On wheels'],
			createdAt: Date.now(),
			inStock: true,
		},
	]
}
