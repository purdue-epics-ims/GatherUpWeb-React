import {
  SET_FIREBASE,
  SET_GAPI
} from '../actions';

const initialState = {
  firebase: null,
  gapi: null
}

const PackageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FIREBASE:
      return {
        ...state,
        firebase: payload
      }
    case SET_GAPI:
      return {
        ...state,
        gapi: payload
      }
    default:
      return state
  }
}

export default PackageReducer;
