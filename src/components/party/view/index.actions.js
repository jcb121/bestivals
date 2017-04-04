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
