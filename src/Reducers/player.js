export default (
  state={
  playBack: {}
  }, action) => {

  switch(action.type){
    case ("UPDATE_PLAYBACK"):
      return {...state, playBack: action.payload}
    default:
      return state
  }
}
