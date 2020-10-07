import {UPDATE_LIST, DEFAULT_STATE} from './types'

export function updateList(request, token, message) {
	return async dispatch => {

		try{
			const list = await request('/api/items/get_list', 'GET', null, {
          		Authorization: `Bearer ${token}`})
			dispatch({type: UPDATE_LIST, payload: list})
		} catch(e) {
			message('Ошибка получения списка')
		}		
	}
}

export function clearList() {
	return {
		type: DEFAULT_STATE
	}
}