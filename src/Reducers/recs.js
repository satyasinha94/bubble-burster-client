export default (
  state={
  genre_recommendations: [],
  artist_recommendations: [],
  track_recommendations: [],
  }, action) => {
  switch(action.type){
    case ("GET_GENRE_RECOMMENDATIONS"):
      return {...state, genre_recommendations: action.payload}
    case ("GET_ARTIST_RECOMMENDATIONS"):
      return {...state, artist_recommendations: action.payload}
    case ("GET_TRACK_RECOMMENDATIONS"):
      return {...state, track_recommendations: action.payload}
    default:
      return state
  }
}
