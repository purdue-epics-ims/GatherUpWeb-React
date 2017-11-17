import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import UserReducer from './UserReducer'
import PackageReducer from './PackageReducer'
// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase,
  user: UserReducer,
  packages: PackageReducer,
})



export default rootReducer
