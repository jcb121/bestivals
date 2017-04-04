const defaultState = {
  ready: false,
  map: false,
  markers: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'MAPS_READY':
      return {
        ...state,
        ready: true
      };
    case 'CREATE_MAP':
      return {
        ...state,
        map: action.payload
      }
    default:
      return state;
  }
}
