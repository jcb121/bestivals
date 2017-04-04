export function setFriends(){
  return function(dispatch, getState){
    window.FB.api('/me/friends?limit=5', function(response){
      if(response.data.length){
        dispatch({
          type:'SET_FRIENDS',
          payload:response
        })
      }
      else{
        console.warn('No response from Facebook friends API')
      }
    }, { access_token:getState().facebook.accessToken })
  }
}

export function addFriends(){
  return function(dispatch, getState){

    var next = getState().events.next;
    if(!next){
      return;
    }

    window.FB.api(next, function(response){
      dispatch({
        type:'ADD_FRIENDS',
        payload:response
      })
    }, { access_token:getState().facebook.accessToken })
  }
}
