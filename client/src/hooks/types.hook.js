import {useCallback} from 'react'
import moment from 'moment';


export const useTypes = () => {

	const toStringTypes = (item_type) => {
		switch (item_type) {
			case 'range':
				return 'Диапозон от 0 до 5'
			case 'boolean':
				return 'Да/Нет'
			case 'number':
				return 'Число'
			case 'string':
				return 'Строка'
			drfault:
				return ''	
		}
	}

	const booleanToString = (item_value) => {
		switch (item_value) {
			case 'true':
				return 'Да'
			case 'false':
				return 'Нет'
			default:
				return item_value	
		}
	}

	const dateToString = (item_date) => {
		return moment(item_date).format('D MMM YYYY, H:mm')
	}
	
	return {toStringTypes, booleanToString, dateToString}
}