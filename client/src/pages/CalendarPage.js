import React, {useState, useEffect} from 'react'
import { Calendar, List, Divider, Button} from 'antd'
import {useSelector} from 'react-redux'
import {useTypes} from '../hooks/types.hook'
import {useHttp} from '../hooks/http.hook'


export const CalendarPage = () => {

	const [items_array, setArray] = useState([])
  const [selectedDate, setDate] = useState(null)
	const list = useSelector(state => state.list)
	const {booleanToString} = useTypes()
  const {loading, data_request} = useHttp()

  useEffect(() => {
    onSelect(Date.now())
  },[])

  useEffect(() => {
    if (selectedDate) {
      onSelect(selectedDate)
      setDate(null)
    }
  },[selectedDate])

  const deleteHandler = async (item_name, date, value) => {
    const data = {"item_name": item_name, "item_data": {"date": date, "value": value}}
    try{
      await data_request('/api/items/delete_data', 'POST', data, true)  
      setDate(date)
    } catch (e) {}
  }

	const onSelect = (value) => {
  		const current_items = []

  		list.items.map((item) => (
  			item.item_data.map((data) => {
  				const list_date = new Date(data.date)
  				const selected_date = new Date(value)
  				if (compareDates(list_date, selected_date)) {
  					current_items.push({"item_name": item.item_name,"item_value": data.value, "item_date": data.date})
  				}
  			})
  		))
  		setArray(current_items)
	}

	return(
		<>	
    	<Calendar fullscreen={false} onSelect={onSelect} mode="month"/>	
  		<Divider orientation="center">Записи за выбранный день</Divider>
  		
  		{items_array && <List
  			dataSource = {items_array}
  			bordered
  			renderItem = {item => (
  				<List.Item
              actions={[
                <Button disabled={loading} onClick={() => deleteHandler(item.item_name, item.item_date, item.item_value)} type="link">удалить</Button>]}>
						<List.Item.Meta
  						title={item.item_name}
  						description={ booleanToString(item.item_value) }
  				/>
  			</List.Item>
				)}
  		/>}	
  	</>
	)
}

function compareDates(date1, date2) {
   return date1.getFullYear() === date2.getFullYear()
        && date1.getDate() === date2.getDate()
        && date1.getMonth() === date2.getMonth()
}