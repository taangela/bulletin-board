import Axios from 'axios';
import { API_URL } from '../settings.js';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getPublished = ({ posts }) => posts.data.filter(el => el.status === 'published');
export const getPostById = ({ posts }, postId) => {
  const postsArray = posts.data.filter(el => el._id === postId);
  return postsArray.length ? postsArray[0] : { error: true };
};

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const LOADING_START = createActionName('LOADING_START');
const GET_ALL_POSTS_FROM_API = createActionName('GET_ALL_POSTS_FROM_API');
const LOADING_STOP = createActionName('LOADING_STOP');

const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

/* action creators */
export const loadingStart = payload => ({ payload, type: LOADING_START });
export const getAllpostsFromApi = payload => ({ payload, type: GET_ALL_POSTS_FROM_API  });
export const loadingStop = payload => ({ payload, type: LOADING_STOP });
export const addPostAction = payload => ({ payload, type: ADD_POST });
export const updatePostAction = payload => ({ payload, type: UPDATE_POST });

/* thunk creators */
export const fetchPublished = () => {

  return (dispatch, getState) => {
    dispatch(loadingStart());

    Axios
      .get((`${API_URL}/posts`))
      .then(res => {
        dispatch(getAllpostsFromApi(res.data));
      })
      .catch(err => {
        dispatch(loadingStop(err.message || true));
      });
  };
};

export const addPost = (post) => {
  console.log ('addPost action');
  return (dispatch) => {
    dispatch(loadingStart());
    console.log('loadingStart');
    Axios
      .post((`${API_URL}/posts`), post)
      .then(res => {
        console.log('post', post);
        dispatch(addPostAction(res.data));
        dispatch(loadingStop());
      })
      .catch(err => {
        console.log('error caught', err);
        dispatch(loadingStop(err.message || true));
      });
  }; 
};

export const updatePost = (post) => {
  console.log ('updatePost action');
  const postId = post._id;
  return (dispatch) => {
    dispatch(loadingStart());
    console.log('loadingStart');
    Axios
      .put((`${API_URL}/posts`) + postId, post)
      .then(res => {
        dispatch(updatePostAction(res.data));
        dispatch(loadingStop());
      })
      .catch(err => {
        console.log('error caught', err);
        dispatch(loadingStop(err.message || true));
      });
  }; 
};

export const reducer = (statePart = [], action = {}) => {
  console.log('statePart', statePart);
  console.log('action', action);
  switch (action.type) {
    case LOADING_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case GET_ALL_POSTS_FROM_API: {
      return {
        ...statePart,
        // bez loading
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case LOADING_STOP: { //(jesli action.error != null to ustaw error na to cos, inaczej error = false)
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data,
          action.payload,
        ],
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: statePart.data.map(el => {
          return el._id === action.payload._id ?
            action.payload
            : el;
        }),
      };
    }
    default:
      return statePart;
  }
};


/*export const addPostRequest = (data) => {
  return async dispatch => {

    dispatch(loadingStart({ name: 'ADD_POST' }));
    try {

      let res = await Axios.post(`${API_URL}/posts`, data);
      dispatch(addPost(res.data));
      dispatch(getAllpostsFromApi({ name: 'ADD_POST' }));

    } catch(e) {
      dispatch(loadingStop({ name: 'ADD_POST', error: e.message }));
    }

  };
};*/


/* reducer */
/*export const reducer = (statePart = [], action = {}) => {
  console.log('statePart', statePart);
  console.log('action', action);
  switch (action.type) {
    // case LOADING_START
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    // case GET_ALL_POSTS_FROM_API
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        // bez loading
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    // case LOADING_STOP (jesli action.error != null to ustaw error na to cos, inaczej error = false)
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data,
          action.payload,
        ],
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: statePart.data.map(el => {
          return el.id === action.payload.id ?
            action.payload
            : el;
        }),
      };
    }
    default:
      return statePart;
  }
};*/