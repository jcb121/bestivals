export function setSearch(query){
  return function(dispatch, getState){

    var url = '/me/events?limit=5'
    if(query){
      url = '/search?type=event&limit=5&q=' + query.replace(' ', '%20')
    }

    window.FB.api( url, function(response){
      dispatch({
        type:'SET_EVENTS',
        payload:response
      })
    }, {access_token:getState().facebook.accessToken})
  }
}
