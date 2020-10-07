import React, {useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useTypes} from '../hooks/types.hook'
import {useSelector} from 'react-redux'
import { Form, Button, Typography, DatePicker } from 'antd';
import {NotationItem} from '../components/NotationItem'

export const NotationPage = () => {
	
	const {Title} = Typography
	const {toStringTypes} = useTypes()
	const {loading, data_request} = useHttp()	
	const list = useSelector(state => state.list)
	const [date, setDate] = useState(Date.now)

	const saveHandler = values => {
		const data = {"data": values, "date": date }
		try{
			data_request('/api/items/add_data', 'POST', data, true)
		} catch (e) {}
	}

	const onDateChange = new_date => {
		if (new_date) {
			const dateDate = new Date(new_date._d)
			setDate(dateDate.getTime())
		}	
	}

	const layout = {
	  labelCol: { span: 4 , offset: 4},
	  wrapperCol: { span: 8},
	}

	const tailLayout = {
	  wrapperCol: { span:8 , offset:8 },
	}

	if (list && list.items && list.items[0]) {

		return(
			<>
			<Title className="textalign-center exp pt-50" level={4}>
				Добавьте записи за<DatePicker onChange={onDateChange} bordered={false} placeholder="сегодня"/>
			</Title>
			
			<Form 
				name="note_form"
				onFinish={saveHandler}
				{...layout}
			>
	      		{list.items.map((item,index) => (
	      			<NotationItem item={item} index={index} />
	      		))}

	      		<Form.Item {...tailLayout}>
	        		<Button disabled={loading} type="primary" htmlType="submit">
	          			Сохранить
	        		</Button>
	      		</Form.Item>
	    	</Form>
	    	</>
		)
	} else {
		return(
			<Title className="textalign-center pt-50" level={4}>Добавьте маркеры на странице «Управление», чтобы добавлять записи.</Title>
		)
	}
}