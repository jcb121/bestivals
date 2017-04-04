export function fbLogin(dispatch, getState ){
  return function(dispatch){
    window.FB.login(function(response){
      if(response.status === 'connected'){
        dispatch({
          type: 'FB_LOGGED_IN',
          payload: {
            accessToken:response.authResponse.accessToken,
            id:response.authResponse.userID
          }
        })

        window.wp_api('auth', { token: response.authResponse.accessToken }, 'POST')
        .then(function(response){
          dispatch({
            type: "SITE_AUTHED",
            payload: response.session
          })
        })

      }else{
        dispatch({
          type: 'FACEBOOK_AUTH_FAILED',
          payload: response
        })
      }
    }, {scope: 'publish_actions user_events user_friends'})
  }
}
