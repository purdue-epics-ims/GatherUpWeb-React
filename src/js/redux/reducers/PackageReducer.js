import {
  SET_FIREBASE,
} from '../actions';

const initialState = {
  firebase: null
}

const PackageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FIREBASE:
      return {
        ...state,
        firebase: payload
      }
    default:
      return state
  }
}

export default PackageReducer;
