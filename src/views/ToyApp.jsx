import { Component } from 'react'
import { connect } from 'react-redux'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toyActions'
//CMPS
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'

class _ToyApp extends Component {
	async componentDidMount() {
		this.props.loadToys()
	}

	onRemoveToy = async (id) => {
		await this.props.removeToy(id)
	}

	onChangeFilter = (filterBy) => {
		this.props.setFilterBy(filterBy)
		this.props.loadToys()
	}

	render() {
		const { toys } = this.props
		if (!toys) return <div>Loading...</div>

		return (
			<div className="toy-app">
				<div className="main-content flex">
					<ToyFilter onChangeFilter={this.onChangeFilter} />
					<ToyList toys={toys} onRemoveToy={this.onRemoveToy} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		toys: state.toyModule.toys,
	}
}

const mapDispatchToProps = {
	loadToys,
	removeToy,
	setFilterBy,
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)
