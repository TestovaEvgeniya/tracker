import {useTypes} from '../hooks/types.hook'
import {useHttp} from '../hooks/http.hook'
import { Button, Tooltip, Typography, Divider, Row, Col, Space} from 'antd';
import { DeleteOutlined, ProfileOutlined} from '@ant-design/icons';
import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {DataChange} from '../components/DataChange'


export const ItemChange = (props) => {

	const {toStringTypes} = useTypes()
	const {loading, data_request} = useHttp()
	const {Text, Title} = Typography;
	const list = useSelector(state => state.list)
	const [dataChanging, setDataChanging] = useState(falseArray(list))
	const [rendering, setRendering] = useState(false)

	const deleteHandler = item_name => {
		try{
			data_request('/api/items/delete_item', 'POST', item_name, true)
		} catch (e) {}
	}

	const editHandler = names => {
		try{
			data_request('/api/items/change_item', 'POST', names, true)
		} catch (e) {}
	}

	const dataHandler = index => {
		const new_dataChanging = dataChanging
		new_dataChanging[index] = !new_dataChanging[index]
		setDataChanging(new_dataChanging)
		setRendering(!rendering)
	}

	if (list && list.items[0]) {

		return(
			<>
			 <Row>
     			 <Col span={12} offset={6}>

					<Title className="textalign-center pt-50" level={4}>Здесь вы можете управлять данными</Title>

					{list.items.map((item,index) => (
						<>
						  	<Divider orientation="center">{item.item_name}</Divider>

							<Row>
								<Col flex={8}>
									<Space>
										<Text disabled={loading} 
										editable={{ onChange: (new_name) => editHandler({"old_name": item.item_name, "new_name": new_name}) }}>
											{item.item_name}
										</Text>
										<Text type="secondary">(тип маркера: {toStringTypes(item.item_type)})</Text>
									</Space>
								</Col>
								<Col>
									<Space>
										<Tooltip title="Удалить маркер">
		      								<Button disabled={loading}
		      										onClick={() => deleteHandler({"item_name": item.item_name})} 
		      										shape="circle" 
		      										icon={<DeleteOutlined />} />
		    							</Tooltip>
		    							<Tooltip title="Изменить данные маркера">
		      								<Button disabled={loading} 
		      										onClick={() => dataHandler(index)} 
		      										shape="circle" 
		      										icon={<ProfileOutlined />} />
		    							</Tooltip>
		    						</Space>
		    					</Col>
		    				</Row>

							{dataChanging[index] &&  <DataChange data={item.item_data} item={item} index={index} />}
						</>
					))}

				</Col>
			</Row>
			</>
	    )
	}
	return(
		null
	)
}

function falseArray (list) {
	if (list && list.items[0]) {
		const array = new Array(list.items.length)
		return array.fill(false)
	}
	return []
}