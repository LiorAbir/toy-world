import { Component } from 'react'
import { connect } from 'react-redux'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toyActions'
import { updateUser, removeFromUser, addToUser } from '../store/actions/UserAction'
//CMPS
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { SearchFilters } from '../cmps/SearchFilters'

class _ToyApp extends Component {
	state = {
		filterBy: {
			name: '',
			price: '',
			inStock: false,
			labels: [],
			page: 0,
			sort: '',
		},
	}

	async componentDidMount() {
		this.props.loadToys()
	}

	onChangeFilter = (filterBy) => {
		this.setState({ filterBy }, () => {
			this.props.setFilterBy(filterBy)
			this.props.loadToys()
		})
	}

	onHandleChange = ({ name, price }) => {
		this.setState(
			(prevState) => ({ filterBy: { ...prevState.filterBy, name, price } }),
			() => {
				this.props.setFilterBy(this.state.filterBy)
				this.props.loadToys()
			}
		)
	}

	onRemoveToy = async (id) => {
		await this.props.removeToy(id)
	}

	onAddToUser = async (toy, category) => {
		const user = this.props.loggedInUser
		if (!user) return this.props.history.push('/login')
		this.props.addToUser(toy, category)
	}

	onRemoveFromUser = async (toyId, category) => {
		const user = this.props.loggedInUser
		if (!user) return this.props.history.push('/login')
		this.props.removeFromUser(toyId, category)
	}

	render() {
		const { toys, loggedInUser } = this.props
		if (!toys) return <div>Loading...</div>

		return (
			<div className="toy-app">
				<div className="content-container flex">
					<div className="search-container">
						<SearchFilters onHandleChange={this.onHandleChange} />
					</div>
					<div className="main-content flex">
						<ToyFilter onChangeFilter={this.onChangeFilter} />
						<ToyList
							toys={toys}
							user={loggedInUser}
							onRemoveToy={this.onRemoveToy}
							onAddToUser={this.onAddToUser}
							onRemoveFromUser={this.onRemoveFromUser}
						/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		toys: state.toyModule.toys,
		loggedInUser: state.userModule.loggedInUser,
	}
}

const mapDispatchToProps = {
	loadToys,
	removeToy,
	setFilterBy,
	updateUser,
	addToUser,
	removeFromUser,
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)
