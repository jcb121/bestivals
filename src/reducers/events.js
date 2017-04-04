//const LOADING_STATE = 'LOADING';
const READY_STATE = 'READY';

const defaultState = {
  state: READY_STATE,
  cache:{},
  events: [],
  next:false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_EVENT_CACHE':
      return {
        ...state,
        cache:{
          ...state.cache,
          [action.payload.id]:action.payload
        }
      }
    case 'SET_EVENTS':
      return {
        ...state,
        cache: action.payload.data.reduce(function(cache, event){
          cache[event.id] = event;
          return cache;
        }, state.cache),
        events: action.payload.data.map(event => { return event.id }),
        next: action.payload.paging.next
      }
    case 'ADD_EVENTS':
      return {
        ...state,
        cache: action.payload.data.reduce(function(cache, event){
          cache[event.id] = event;
          return cache;
        }, state.cache),
        events: [...state.events, ...action.payload.data.map( event =>{ return event.id })],
        next: action.payload.paging.next
      }
    case 'CLEAR_ALL_EVENTS':
      return defaultState;
    default:
      return state;
  }
}
