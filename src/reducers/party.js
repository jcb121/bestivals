//const PENDING_STATE = 'PENDING';
//const LOADING_STATE = 'LOADING';
//const CREATING_STATE = 'CREATING';
//const CREATED_STATE = 'CREATED';
const READY_STATE = 'READY';

const defaultState = {
  party: false,
  state: READY_STATE,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PARTY':
      return {
        state: READY_STATE,
        party: action.payload,
      }
    case 'ADD_EVENT_TO_PARTY':
      var dupe = state.party.events.find(function(event){
        return event === action.payload.id;
      });
      if(dupe) return state;
      return {
        ...state,
        party:{
          ...state.party,
          events: [
            ...state.party.events,
            action.payload.id
          ]
        }
      };
    case 'REMOVE_EVENT_FROM_PARTY':
      return {
        ...state,
        party:{
          ...state.party,
          events: [
            ...state.party.events.filter( event => {
              return event !== action.payload.id;
            }),
          ]
        }
      };
    case 'ADD_FRIEND_TO_PARTY':
      return {
        ...state
      };
    case 'REMOVE_FRIEND_FROM_PARTY':
      return {
        ...state
      };
    default:
      return state;
  }
}

// case 'ADD_FRIEND_TO_PARTY':
//   var dupe = state.find(function(friend){
//     if (friend.id === action.payload.id) return true;
//   });
//   if(dupe) return state;
//   return state = [ ...state, action.payload];
// case 'REMOVE_FRIEND_FROM_PARTY':
//   return state.filter(function(friend){
//     if(friend.id !== action.payload.id) return true;
//   });
// case 'ADD_FRIEND_TO_PARTY':
//   var dupe = state.party.find(function(friend){
//     if (friend.id === action.payload.id) return true;
//   });
//   if(dupe) return state;
//   return {
//     ...state,
//     party: [ ...state.party, action.payload ]
//   }
// case 'REMOVE_FRIEND_FROM_PARTY':
//   return {
//     ...state,
//     party:state.party.filter(function(friend){
//       if(friend.id !== action.payload.id) return true;
//     })
//   }
