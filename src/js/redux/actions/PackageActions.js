import {
  SET_FIREBASE,
  SET_GAPI
} from './actionTypes';

/**
* Save Google API object to redux
* @param: payload(gapi object)
*/
export const setGAPI = payload => {
  return {
		type: SET_GAPI,
    payload
	}
};

/**
* Save Firebase object to redux
* @param: payload(firebase object)
*/
export const setFirebase = payload => {
  return {
		type: SET_FIREBASE,
    payload
	}
};
