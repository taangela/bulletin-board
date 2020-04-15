import Axios from 'axios';
import { API_URL } from '../settings.js';

/* selectors */
export const getUser = ({ user }) => user;

/* action name creator */
const reducerName = 'login';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SWITCH_LOGIN = createActionName('SWITCH_LOGIN');
const SET_LOGGED = createActionName('SET_LOGGED');


/* action creators */
export const loginSwitch = payload => ({ payload, type: SWITCH_LOGIN });
export const setLogged = isLogged => ({ payload: isLogged, type: SET_LOGGED });

export const logOut = () => {
  return (dispatch) => {
    Axios.get(`${API_URL}/logout`)
      .then(res => {dispatch(setLogged(false));})
      .catch(err => dispatch(setLogged(false)));
  };
}; 

export const checkLogin = () => {

  return (dispatch) => {
    Axios
      .get((`${API_URL}/is_authenticated`))
      .then(res => {
        console.log('authenticated', res); 
        dispatch(setLogged(res.data !== 'not_auth'));
      })
      .catch(err => {
        dispatch(setLogged(false));
      });
  };
};


/* thunk creators */

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case SWITCH_LOGIN: {
      if(!statePart.logged) {
        return {
          ...statePart,
          logged: true,
        };
      } else {
        return {
          ...statePart,
          logged: false,
 
        };
      }
    }
    case SET_LOGGED: {
      return {
        ...statePart,
        logged: action.payload,
      };
    }
    default:
      return statePart;
  }
}