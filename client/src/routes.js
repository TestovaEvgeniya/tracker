import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import {ManagePage} from './pages/ManagePage'
import {NotationPage} from './pages/NotationPage'
import {GraphPage} from './pages/GraphPage'
import {CalendarPage} from './pages/CalendarPage'

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/notation" exact>
					<NotationPage />
				</Route>
				<Route path="/manage" exact>
					<ManagePage />
				</Route>
				<Route path="/graph" exact>
					<GraphPage />
				</Route>
				<Route path="/calendar" exact>
					<CalendarPage />
				</Route>
				<Redirect to="/notation" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}