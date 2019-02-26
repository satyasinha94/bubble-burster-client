export default (
  state={
  artists: []
  }, action) => {
  switch(action.type){
    case ("GET_ARTISTS"):
      console.log("fetched artists")
      return {...state, artists: action.payload}
    default:
      return state
  }
}
