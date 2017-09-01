import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase
})

export default rootReducer
