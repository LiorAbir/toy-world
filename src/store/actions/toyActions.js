import { toyService } from '../../services/toy-service'
import { showErrorMsg, showSuccessMsg } from '../../services/eventBus-service'

export function loadToys() {
	return async (dispatch, getState) => {
		try {
			const { filterBy } = getState().toyModule
			const toys = await toyService.query(filterBy)
			dispatch({ type: 'SET_TOYS', toys })
		} catch (err) {
			console.log('cannot load toys')
		}
	}
}

export function removeToy(toyId) {
	return async (dispatch) => {
		try {
			await toyService.remove(toyId)
			dispatch({ type: 'REMOVE_TOY', toyId })
			showSuccessMsg('Deleted successfully')
		} catch (err) {
			showErrorMsg('cannot remove toy. please try again')
			console.log('cannot remove toy')
		}
	}
}

export function updateToy(toy) {
	return async (dispatch) => {
		try {
			await toyService.save(toy)
			dispatch({ type: 'UPDATE_TOY', toy })
			showSuccessMsg('Toy updated successfully')
		} catch (err) {
			showErrorMsg('cannot remove toy. please try again')
			console.log('cannot update toy')
		}
	}
}

export function setFilterBy(filterBy) {
	return (dispatch) => {
		dispatch({ type: 'SET_FILTER', filterBy })
	}
}

export function getToyById(id, num) {
	return async (dispatch) => {
		try {
			const toy = await toyService.getById(id, num)
			return toy
		} catch (err) {
			showErrorMsg('cannot find this toy. please try again')
			console.log('cannot get toy by ')
		}
	}
}
