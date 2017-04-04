export function getEvent(id){
  return function(dispatch, getState){
    window.FB.api(id, function(response){
      dispatch({
        type:'ADD_EVENT_CACHE',
        payload:response
      })
    }, { access_token:getState().facebook.accessToken })
  }
}
