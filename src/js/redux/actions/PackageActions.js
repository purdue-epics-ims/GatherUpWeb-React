import {
  SET_FIREBASE,
} from './actionTypes';

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
