import {
  USER_LOGIN,
  USER_LOGOUT,
  
} from '../actions';

const initialState = {
  name: null,
  profilePicURL: null,

}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        name: action.name,
        profilePicURL: action.profilePicURL
      }
    case USER_LOGOUT:
      return {
        ...state,
        name: null,
        profilePicURL: null
      }
    default:
      return state
  }
}

export default UserReducer;
