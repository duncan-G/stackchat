import { createStore, applyMiddleware } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

/* Action types */
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const UPDATE_NAME = 'UPDATE_NAME';

/* Action creators */
export const gotMessagesFromServer = messages => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
});

export const writeMessage = newMessageEntry => ({
  type: WRITE_MESSAGE,
  newMessageEntry
});

export const gotNewMessageFromServer = message => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message
});

export const updateName = name => ({
  type: UPDATE_NAME,
  name
});

/* Thunk creators */
export const fetchMessages = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/messages');
    dispatch(gotMessagesFromServer(data));
  };
};

export const postMessage = (newMessage, channelId, name) => {
  return async dispatch => {
    const { data } = await axios.post('/api/messages', {
      content: newMessage,
      name: name,
      channelId
    });
    dispatch(gotNewMessageFromServer(data));
    socket.emit('new-message', data);
  };
};

/* Initial State */
const initialState = {
  messages: [],
  newMessageEntry: '',
  name: ''
};

/* Reducer */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.newMessageEntry
      };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return {
        ...state,
        newMessageEntry: '',
        messages: [...state.messages, action.message]
      };
    case UPDATE_NAME:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};

/* CreateStore */
const store = createStore(reducer, applyMiddleware(reduxThunkMiddleware));

export default store;
