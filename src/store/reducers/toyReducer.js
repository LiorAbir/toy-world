const INITIAL_STATE = {
	toys: null,
	filterBy: null,
	// labels: ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'],
	labels: [
		{
			name: 'On wheels',
			isChecked: false,
		},
		{
			name: 'Box game',
			isChecked: false,
		},
		{
			name: 'Art',
			isChecked: false,
		},
		{
			name: 'Baby',
			isChecked: false,
		},
		{
			name: 'Doll',
			isChecked: false,
		},
		{
			name: 'Puzzle',
			isChecked: false,
		},
		{
			name: 'Outdoor',
			isChecked: false,
		},
	],
}

export function toyReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SET_TOYS':
			return {
				...state,
				toys: action.toys,
			}
		case 'ADD_TOY':
			return {
				...state,
				toys: [...state.toys, action.toy],
			}
		case 'REMOVE_TOY':
			return {
				...state,
				toys: state.toys.filter((toy) => toy._id !== action.toyId),
			}
		case 'UPDATE_TOY':
			return {
				...state,
				toys: state.toys.map((toy) =>
					toy._id === action.toy._id ? action.toy : toy
				),
			}
		case 'SET_FILTER':
			return {
				...state,
				filterBy: { ...action.filterBy },
			}

		default:
			return state
	}
}
