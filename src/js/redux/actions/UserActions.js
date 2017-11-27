import {
  USER_LOGIN,
  USER_LOGOUT,

} from './actionTypes';

/**
* Save user data to redux
* @param: user(Google login user basic profile)
*/
export const userLogin = username => {
  return dispatch => dispatch({
    type: USER_LOGIN,
    name: username
  });
};

/**
* Log out and remove user data to redux
*/
export const userLogout = () => {
  return (dispatch, getState) => {
    const { firebase } = getState().packages;

    firebase.auth().signOut().then(() => {
      return dispatch({
        type: USER_LOGOUT,
        name: null,
        profilePicURL: null
      });
    })
  }
};
