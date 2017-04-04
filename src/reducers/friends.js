//const LOADING_STATE = 'LOADING';
const READY_STATE = 'READY';

const defaultState = {
  cache: {},
  friends: [],
  next: false,
  state: READY_STATE
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_USER_CACHE':
      return {
        ...state,
        cache:{
          ...state.cache,
          [action.payload.id]:action.payload
        }
      }
    case 'SET_FRIENDS':
      return {
        friends:action.payload.data.map(function(friend){
            return friend.id
        }),
        cache:{
          ...state.cache,
          ...action.payload.data.reduce(function(obj, friend){
            obj[friend.id] = friend;
            return obj;
          })
        },
        next: action.payload.paging.next
      }
    case 'ADD_FRIENDS':
      return {
        friends: [...state.friends, ...action.payload.data.map(function(friend){
          return friend.id;
        })],
        cache:{
          ...state.cache,
          ...action.payload.data.reduce(function(obj, friend){
            obj[friend.id] = friend;
            return obj;
          })
        },
        next: action.payload.paging.next
      }
    default:
      return state;
  }
}
