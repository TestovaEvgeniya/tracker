import { createStore, compose, applyMiddleware} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' 
import {rootReducer} from './rootReducer'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, compose(
  	applyMiddleware(thunk),
))

let persistor = persistStore(store)

export { store, persistor }
