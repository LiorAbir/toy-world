import React, { Component } from 'react'
import { ReactComponent as ImgIcon } from '../assets/icon/image.svg'
import { uploadImg } from '../services/img-upload.service'

export default class AddImg extends Component {
	handleFile = (ev) => {
		const file = ev.target.files[0]
		this.uploadFile(file)
	}

	async uploadFile(file) {
		const res = await uploadImg(file)
		this.props.onAddImg(res.url)
	}

	render() {
		return (
			<label className="add-img flex" title="Add image">
				<ImgIcon className="add-img-svg" />
				<h3>Add image</h3>
				<input type="file" onChange={this.handleFile} />
			</label>
		)
	}
}
