export default (
  state={
  playBack: {},
  trackSaved: null,
  }, action) => {
  switch(action.type){
    case ("UPDATE_PLAYBACK"):
      return {...state, playBack: action.payload}
    case("UPDATE_TRACK_STATUS"):
      return {...state, trackSaved: action.payload}
    default:
      return state
  }
}
