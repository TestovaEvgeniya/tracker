import {useTypes} from '../hooks/types.hook'
import {useHttp} from '../hooks/http.hook'
import { DatePicker, List, Form, Button, Typography, Space} from 'antd';
import React, {useState} from 'react'
import {NotationItem} from '../components/NotationItem'

export const DataChange = (props) => {

	const data = props.data
	const item = props.item
	const index = props.index
	const {loading, data_request} = useHttp()
	const {booleanToString, dateToString} = useTypes()
	const { Text } = Typography;
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

	const deleteHandler = (item_name, date, value) => {
		const data = {"item_name": item_name, "item_data": {"date": date, "value": value}}
		try{
			data_request('/api/items/delete_data', 'POST', data, true)
		} catch (e) {}
	}

	return(
		<>
		{data && <List
				className="pt-25 pb-25"
  				dataSource = {data}
  				pagination={{
  					pageSize: 5
  				}}
  				renderItem = {elem => (
  					<List.Item
  							actions={[
  								<Button disabled={loading} 
  								onClick={() => deleteHandler(item.item_name, elem.date, elem.value)} 
  								type="link">
  									удалить
  								</Button>]}>
  						<List.Item.Meta
  							title={ dateToString(elem.date) }
  							description={ booleanToString(elem.value) }
  					/>
  				</List.Item>
  				)}
  		/>}
  		
  		<Form 
  			 onFinish={saveHandler}
  		>
  			<NotationItem item={item} index={index} />
  			
  			<Space>
	  			<Form.Item>
	  				<DatePicker onChange={onDateChange} />
	  			</Form.Item>
		  		<Form.Item>
		  			<Button disabled={loading} htmlType="submit">
			          	Сохранить
			        </Button>
			    </Form.Item>
		    </Space>
		</Form>
		</>

	)

}