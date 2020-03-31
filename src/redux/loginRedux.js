
/* selectors */
export const getUser = ({ user }) => user;
//export const getLogStatus = ({ user }) => user.logged;

/* action name creator */
const reducerName = 'login';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const CHANGE_USER = createActionName('CHANGE_USER');
const SWITCH_LOGIN = createActionName('SWITCH_LOGIN');


/* action creators */
export const changeUser = payload => ({ payload, type: CHANGE_USER });
export const loginSwitch = payload => ({ payload, type: SWITCH_LOGIN });


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
    default:
      return statePart;
  }
}