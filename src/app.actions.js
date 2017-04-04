export function authSite(){
  return function(dispatch, getState){
    window.FB.init({
      appId      : '244204299345578',
      status     : true,
      xfbml      : true,
      version    : 'v2.8',
      oauth      : true
    });


    window.FB.api('/me', function(response){

      if(response.id === getState().facebook.id){
        dispatch({
          type: 'FB_LOGGED_IN',
          payload: {
            accessToken: getState().facebook.accessToken,
            id: getState().facebook.id
          }
        })
        window.wp_api('auth', { token: getState().facebook.accessToken }, 'POST')
        .then(function(response){
          dispatch({
            type: "SITE_AUTHED",
            payload: response.session
          })
        })
      }
      else{
        dispatch({
          type: "FB_LOGGED_OUT"
        })
      }

    }, { access_token:getState().facebook.accessToken })
  }
}

export function loadSite(){
  return function(dispatch, getState){
    Promise.all([window.facebookAsyncInit, window.mapsAsyncInit]).then(function(){
      dispatch({
        type: "SITE_LOADED"
      })
    })
  }
}
