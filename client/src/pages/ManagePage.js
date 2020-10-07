import React from 'react'
import {useHttp} from '../hooks/http.hook'
import { Form, Input, Button, Select, Typography } from 'antd';
import {useTypes} from '../hooks/types.hook'
import {ItemChange} from '../components/ItemChange'

export const ManagePage = () => {

	const { Option } = Select
	const {loading, data_request} = useHttp()
	const {toStringTypes} = useTypes()
	const {Title} = Typography

	const addHandler = (values) => {
		try{
			data_request('/api/items/add_item', 'POST', values, true)
		} catch (e) {}
	}

	const layout = {
	  labelCol: { span: 4 , offset: 4},
	  wrapperCol: { span: 8},
	}
	const tailLayout = {
	  wrapperCol: { span:8 , offset:8 },
	}

	return (
		<>
		<Title className="textalign-center pt-50" level={4}>Создайте новый маркер</Title>
			
		<Form
			name="item_form"
			onFinish={addHandler}
			{...layout}
		>
			<Form.Item
				label="Имя маркера"
				name="item_name"
				type="email"
				rules={[{required: true, message: 'Введите название маркера'}]} 
			>
				<Input allowClear />
			</Form.Item>

			<Form.Item
				label="Тип маркера"
				name="item_type"
				rules={[{required: true, message: 'Введите тип маркера'}]} 
			>
				<Select placeholder="Выберите тип маркера">
			      <Option value="range">{toStringTypes('range')}</Option>
			      <Option value="boolean">{toStringTypes('boolean')}</Option>
			      <Option value="number">{toStringTypes('number')}</Option>
			      <Option value="string">{toStringTypes('string')}</Option>
	    		</Select>
	    	</Form.Item>

	    	<Form.Item {...tailLayout}>
    			<Button disabled={loading} type="primary" htmlType="submit">Сохранить</Button>
    		</Form.Item>
    	</Form>
    	<ItemChange />
    	</>   	
	)
}