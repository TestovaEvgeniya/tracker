import React from 'react'
import {useSelector} from 'react-redux'
import Plotly from 'plotly.js-basic-dist'
import * as csDictionary from 'plotly.js/lib/locales/ru.js'
import createPlotlyComponent from 'react-plotly.js/factory'

Plotly.register(csDictionary)

export const GraphPage = () => {

	const Plot = createPlotlyComponent(Plotly)
	const list = useSelector(state => state.list)

	function fill_data(){
		let list_data = []
		let bol_y=5.1
		
		for (let item of list.items) {
			let x = []
			let y = []

			if (item.item_type == 'boolean'){
				let false_x = []
				let false_y = []
				for (let data of item.item_data) {
					if (data.value == 'true'){
						x.push(new Date(data.date))
						y.push(bol_y)
					} else {
						false_x.push(new Date(data.date))
						false_y.push(bol_y)
					}					
				}
				list_data.push({x: x, 
							y: y, 
							type: 'scatter', 
							mode: 'markers', 
							name: item.item_name + '-Да',
							marker: {color: 'green'} })
				list_data.push({x: false_x, 
							y: false_y, 
							type: 'scatter', 
							mode: 'markers', 
							name: item.item_name + '-Нет',
							marker: {color: 'red'} })
				bol_y = bol_y + 0.2

			} else if (item.item_type == 'range') {
				for (let data of item.item_data) {
					x.push(new Date(data.date))
					y.push(Number(data.value))
				}
				list_data.push({x: x, 
							y: y, 
							type: 'scatter', 
							mode: 'lines-markers', 
							name: item.item_name,
							line: {dash: 'dot'} })

			} else if (item.item_type == 'number') {
				for (let data of item.item_data) {
					x.push(new Date(data.date))
					y.push(Number(data.value))
				}
				list_data.push({x: x, 
							y: y, 
							type: 'scatter', 
							mode: 'lines-markers', 
							name: item.item_name })
			} else if (item.item_type == 'string'){
				let text = []
				for (let data of item.item_data) {
					x.push(new Date(data.date))
					y.push(-0.5)
					text.push(data.value)
				}
				list_data.push({x: x, 
							y: y, 
							type: 'scatter', 
							mode: 'markers', 
							name: item.item_name,
							marker: {color: 'yellow'},
							text: text })
			}

		}	
		return list_data
	}

	return(

		<Plot
	        data={fill_data()}
	        layout={ {title: 'График данных', autosize: true, showlegend: true} }
	        config = {{locale: 'ru'}}
	        useResizeHandler={true}
	        style= {{width: "100%", height: "100%"}}
      	/>
	)
}