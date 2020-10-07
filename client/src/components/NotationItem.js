import React from 'react'
import { Form, Input, Select } from 'antd';
import {useTypes} from '../hooks/types.hook'

export const NotationItem = (props) => {
  
  const isNumber = require('is-number')
  const item = props.item
  const index = props.index
  const {Option} = Select
  const {toStringTypes} = useTypes()

  switch (item.item_type) {

    case 'range':
      return (
          <Form.Item
            label={item.item_name}
            name={item.item_name}
            key={index}
            rules={[
              {
                whitespace: true,
                message: "Введите число из диапозона",
                validator: (_, value) => isNumber(value) && value <= 5 && value >= 0 || value == undefined ? Promise.resolve() : Promise.reject('Не число из диапозона')
              }
           ]}
          >
            <Input allowClear placeholder={toStringTypes(item.item_type)} />
          </Form.Item>
      )

    case 'number':
      return (
          <Form.Item
                    label={item.item_name}
                    name={item.item_name}
                    key={index}
                    rules={[
                      {
                        whitespace: true,
                        message: "Введите число",
                        validator: (_, value) => isNumber(value) || value == undefined ? Promise.resolve() : Promise.reject('Не число')
                        }
                    ]}
                >
                    <Input allowClear placeholder={toStringTypes(item.item_type)} />
                </Form.Item>
      )

    case 'string':
      return (

                <Form.Item
                    label={item.item_name}
                    name={item.item_name}
                    key={index}
                    rules={[
                      {
                        whitespace: true,
                        message: "Введите текст"
                      }
                    ]}
                >
                    <Input allowClear placeholder={toStringTypes(item.item_type)} />
                </Form.Item>
      )

    case 'boolean':
      return (
          <Form.Item
                    label={item.item_name}
                    name={item.item_name}
                    key={index}
                    rules={[
                      {
                        message: "Выберите значение"
                      }
                    ]}
                >
                    <Select placeholder={toStringTypes(item.item_type)}>
                      <Option value="true">Да</Option>
                      <Option value="false">Нет</Option>
                    </Select>
                </Form.Item>
      )

    default: return null
  }
}