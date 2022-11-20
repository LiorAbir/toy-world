import axios from 'axios'
import { UPLOAD_PRESET, CLOUD_NAME } from '../../ignore/apis'

export const uploadImg = async (file) => {
	const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
	const FORM_DATA = new FormData()
	// Building the request body
	FORM_DATA.append('file', file)
	FORM_DATA.append('upload_preset', UPLOAD_PRESET)
	// Sending a post method request to Cloudniarys' API
	try {
		const res = await axios.post(UPLOAD_URL, FORM_DATA)
		return res.data
	} catch (err) {
		console.error('ERROR!', err)
	}
}
