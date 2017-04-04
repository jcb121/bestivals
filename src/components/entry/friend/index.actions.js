export function getFriend(id){
  return function(dispatch, getState){
    window.FB.api(id, function(response){
      dispatch({
        type:'ADD_USER_CACHE',
        payload:response
      })
    }, { access_token:getState().facebook.accessToken })
  }
}
