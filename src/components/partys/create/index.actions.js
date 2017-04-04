export function createParty ( party ){
  return function (dispatch, getState){

    dispatch({
      type: 'PARTY_CREATING',
    })

    window.wp_api('partys', {
      session: getState().site.authed,
      party: JSON.stringify(party)
    }, 'POST')
    .then(function(response){
      console.log(response);
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

export function addParty ( party ){
  return{
    type: 'ADD_PARTY',
    payload: party
  }
}

export function modifyParty ( mods ){
  return {
    type: "MODIFY_PARTY",
    payload: mods
  }
}

export function removeParty ( party ){
  return {
    type: "REMOVE_PARTY",
    payload: party
  }
}
