import {UPDATE_LIST, DEFAULT_STATE} from './types'

const initialState = {
  list: null
}

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST:
      return state=action.payload
     case DEFAULT_STATE:
     	return state=null
    default: return state
  }
}