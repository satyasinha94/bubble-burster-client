export default (
  state={
  tracks: []
  }, action) => {
  switch(action.type){
    case ("GET_TRACKS"):
      console.log("fetched tracks")
      return {...state, tracks: action.payload}
    default:
      return state
  }
}
