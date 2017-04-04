const defaultState = {
  loaded: false,
  authed: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SITE_LOADED':
      return {
        ...state,
        loaded: true
      };
    case 'SITE_AUTHED':
      return {
        ...state,
        authed: action.payload
      };
    default:
      return state;
  }
}
