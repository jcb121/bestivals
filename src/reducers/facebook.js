//const LOGGED_OUT_STATE = 'LOGGED_OUT';
const LOGGED_IN_STATE = 'LOGGED_IN';
const PENDING_STATE = 'PENDING';
const READY_STATE = 'READY';

const defaultState = {
  state: READY_STATE,
  accessToken: false,
  id: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'FB_INFO':
      return {
        state: PENDING_STATE,
        accessToken: action.payload.accessToken,
        id: action.payload.id
      }
    case 'FB_LOGGED_IN':
      return {
        state: LOGGED_IN_STATE,
        accessToken: action.payload.accessToken,
        id: action.payload.id
      }
    case 'FB_LOGGED_OUT':
      return defaultState;
    default:
      return state;
  }
}
