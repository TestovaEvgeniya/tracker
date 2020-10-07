import {useState, useCallback, useContext} from 'react'
import {useDispatch} from 'react-redux'
import {updateList} from '../redux/actions'
import {useMessage} from './message.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'


export const useHttp = () => {

	const [loading, setLoading] = useState(false)
	const message = useMessage()
	const auth = useContext(AuthContext)
	const dispatch = useDispatch()
	const history = useHistory()

	const request = useCallback(async (url, method = 'GET', body = null, headers={}) => {
		setLoading(true)
		try{
			if (body) {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}
			const response = await fetch(url, {method, body, headers})
			const data = await response.json()
			message(data.message)

			if (response.status && response.status == 401) {
				auth.logout()
    			history.push('/')
			}

			setLoading(false)
			return data

		} catch (e) {
			setLoading(false)
			throw e
		}
	}, [])

	const data_request = async(url, method, body, update = false ) => {
		setLoading(true)
		try{
			const data = await request(url, method, body, {
          		Authorization: `Bearer ${auth.token}`
        	})
			if (update) {
				await dispatch(updateList(request, auth.token, message))
			}

			setLoading(false)
			return data
		} catch (e) {
			setLoading(false)
			throw e
		}
	}

	return {loading, data_request, request}
}