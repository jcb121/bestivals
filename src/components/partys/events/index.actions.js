export function getPartys(){
  return function (dispatch, getState){
    window.wp_api('partys', { session: getState().site.authed })
    .then(function(response){
      dispatch({
        type: 'ADD_PARTYS',
        payload: response
      })
      dispatch({
        type: 'PARTYS_READY'
      })
    })
  }
}
