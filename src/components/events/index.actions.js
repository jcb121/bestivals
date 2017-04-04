export function setEvents(){
  return function(dispatch, getState){
    window.FB.api('/me/events/?limit=5', function(response){
      dispatch({
        type:'SET_EVENTS',
        payload:response
      })
    }, { access_token:getState().facebook.accessToken })
  }
}

export function addEvents(){
  return function(dispatch, getState){

    var next = getState().events.next;
    if(!next){
      return;
    }

    window.FB.api( next, function(response){
      dispatch({
        type:'ADD_EVENTS',
        payload:response
      })
    }, { access_token:getState().facebook.accessToken })
  }
}
