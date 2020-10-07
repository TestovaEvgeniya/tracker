import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import { Layout } from 'antd';

const { Header, Content, Footer} = Layout;

function App() {
	const {token, login, logout, userId} = useAuth()
	const isAuthenticated = !!token
 	const routes = useRoutes(isAuthenticated)
 	
 	return (
 		<AuthContext.Provider value={{
 			token, login, logout, userId, isAuthenticated}}>
	      	<Router>
	      		<Layout className="layout">
	      			<Header>
	      				<div className="logo">Tracker</div>
		      			{isAuthenticated && <Navbar />}
		      		</Header>
		        	<Content  >
		        		<div className="site-layout-content">{routes}</div>    		
					</Content>	
					        	
	        	</Layout>
	      	</Router>
      	</AuthContext.Provider>
    )
}

export default App
