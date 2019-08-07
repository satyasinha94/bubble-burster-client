export default (
  state={
  artists: []
  }, action) => {
  switch(action.type){
    case ("GET_ARTISTS"):
      return {...state, artists: action.payload}
    default:
      return state
  }
}
