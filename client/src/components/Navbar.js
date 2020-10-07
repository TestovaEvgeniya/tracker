import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {Menu} from 'antd';

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item> 
        <NavLink to="/notation">Запись</NavLink>
      </Menu.Item>
      <Menu.Item> 
        <NavLink to="/manage">Управление</NavLink>
      </Menu.Item>
      <Menu.Item> 
        <NavLink to="/graph">График</NavLink>
      </Menu.Item>
      <Menu.Item> 
        <NavLink to="/calendar">Календарь</NavLink>
      </Menu.Item>
      <Menu.Item> 
        <a href="/" onClick={logoutHandler}>Выйти</a>
      </Menu.Item>   
    </Menu>   
  )
}
