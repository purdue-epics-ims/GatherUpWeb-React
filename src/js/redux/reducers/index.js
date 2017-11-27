import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import PackageReducer from './PackageReducer'


const rootReducer = combineReducers({
  user: UserReducer,
  packages: PackageReducer,
})

export default rootReducer
