export function getParty(id){
  return function(dispatch, getState){
    window.wp_api('partys/' + id, { session: getState().site.authed })
    .then(function(response){
      dispatch({
        type: 'ADD_PARTY',
        payload: response
      })
      dispatch({
        type: 'SET_CURRENT_PARTY',
        payload: response
      })
    })
  }
}

export function addFriend(id){
  return {
    type: 'ADD_FRIEND_TO_PARTY',
    payload: id
  }
}

export function removeFriend(id){
  return {
    type: 'REMOVE_FRIEND_FROM_PARTY',
    payload: id
  }
}

export function addEvent(event){
  return {
    type: 'ADD_EVENT_TO_PARTY',
    payload: event
  }
}

export function removeEvent(event){
  return {
    type: 'REMOVE_EVENT_FROM_PARTY',
    payload: event
  }
}

export function saveParty(){
  return function(dispatch, getState){

    dispatch({
      type: 'ADD_PARTY',
      payload: getState().party.party
    });

    window.wp_api('partys/' + getState().party.party.id, {
      session: getState().site.authed,
      events: JSON.stringify(getState().party.party.events)
    }, 'POST')
    .then(function(response){
      console.log(response);
    })
  }
}
