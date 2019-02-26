export default (
  state={
  genres: []
  }, action) => {
  switch(action.type){
    case ("GET_GENRES"):
      console.log("fetched genres")
      return {...state, genres: action.payload}
    default:
      return state
  }
}
