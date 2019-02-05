import { combineReducers } from 'redux'
import documentsReducer from './documents'

const rootReducer = combineReducers({
  documents: documentsReducer
})

export default rootReducer
