export default (
  state={
  tracks: []
  }, action) => {
  switch(action.type){
    case ("GET_TRACKS"):
      return {...state, tracks: action.payload}
    default:
      return state
  }
}
