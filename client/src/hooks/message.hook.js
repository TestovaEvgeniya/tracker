import {useCallback} from 'react'
import { message } from 'antd';

export const useMessage = () => {
	return useCallback(text => {
			if (text) {
				message.info(text)
			}
		}, [])
}