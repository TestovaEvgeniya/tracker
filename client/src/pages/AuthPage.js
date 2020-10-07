import React, {useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import { Input, Button, Card, Row, Col, Space } from 'antd';

import {useDispatch} from 'react-redux'
import {updateList} from '../redux/actions'

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const dispatch = useDispatch()
	const {loading, request} = useHttp()
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	
	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})

			} catch (e) {}
	}

	const loginHandler = async () => {
		try {
				const data = await request('/api/auth/login', 'POST', {...form})
				await auth.login(data.token, data.userId)
				dispatch(updateList(request, data.token, message))
			} catch (e) {}
	}

	return (
		<>	
			<Row>
      			<Col span={12} offset={6}>
					<Card className="textalign-center" title="Войдите или зарегистрируйтесь" >
						<Space direction="vertical">
							<Input 
								label="Email"
								id="email"
								name="email"
								value={form.email}
								type="email"
								onChange={changeHandler} />
						
							<Input.Password 
								label="Пароль"
								id="password"
								name="password"
								value={form.password}
								onChange={changeHandler} />	
							<Space direction="horizontal">			
								<Button disabled={loading} onClick={loginHandler}>Войти</Button>	
								<Button disabled={loading} onClick={registerHandler}>Зарегистрироваться</Button>
							</Space>
						</Space>
					</Card>
				</Col>
			</Row>	
		</>
	)
}