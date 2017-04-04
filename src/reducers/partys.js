const PENDING_STATE = 'PENDING';
//const LOADING_STATE = 'LOADING';
const CREATING_STATE = 'CREATING';
const CREATED_STATE = 'CREATED';
const READY_STATE = 'READY';

const defaultState = {
  state: PENDING_STATE,
  partys: {},
  current: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'PARTY_CREATING':
      return {
        ...state,
        state: CREATING_STATE
      }
    case 'PARTY_CREATED':
      return {
        ...state,
        state: CREATED_STATE,
        current: action.payload
      }
    case 'PARTYS_READY':
      return {
        ...state,
        state: READY_STATE,
      }
    case 'ADD_PARTY':
      return {
        ...state,
        partys: {
          ...state.partys,
          [action.payload.id]: action.payload
        }
      }
    case 'ADD_PARTYS':
      return {
        ...state,
        partys:{
          ...state.partys,
          ...action.payload
        }
      }
    case 'REMOVE_PARTY':
      delete state[action.payload.id];
      return { ...state };
    default:
      return state;
  }
}
