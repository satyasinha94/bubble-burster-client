export default (
  state={
    radio: false,
    queue: []
  }, action) => {
    switch(action.type){
    case("ADD_TRACKS_TO_QUEUE"):
      return {...state, queue: action.payload}
    case("CLEAR_QUEUE"):
      return {...state, queue: []}
    case("UPDATE_QUEUE"):
      return {...state, queue: action.payload}
    case("RADIO_ON"):
      return {...state, radio: true}
    case("RADIO_OFF"):
      return {...state, radio: false}
    default:
      return state
    }
  }
