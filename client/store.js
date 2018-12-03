import { createStore, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import axios from 'axios';

/* Action types */
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

/* Action creators */
export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
});

/* Thunk creators */
export const fetchMessages = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/messages');
    dispatch(gotMessagesFromServer(data));
  };
};

/* Initial State */
const initialState = {
  messages: []
};

/* Reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
};

/* CreateStore */
const store = createStore(reducer, applyMiddleware(reduxThunkMiddleware));

export default store;
