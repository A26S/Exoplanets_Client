import { combineReducers } from 'redux'
import nasaReducer from './nasaReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    nasa: nasaReducer,
    auth: authReducer
})

export default rootReducer