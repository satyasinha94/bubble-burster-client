export default (
  state={
  genre_recommendations: [],
  artist_recommendations: [],
  track_recommendations: [],
  }, action) => {
  switch(action.type){
    case ("GET_GENRE_RECOMMENDATIONS"):
      console.log("fetching genre recommendations")
      return {...state, genre_recommendations: action.payload}
    case ("GET_ARTIST_RECOMMENDATIONS"):
      console.log("fetching artist recommendations")
      return {...state, artist_recommendations: action.payload}
    case ("GET_TRACK_RECOMMENDATIONS"):
      console.log("fetching track recommendations")
      return {...state, track_recommendations: action.payload}
    default:
      return state
  }
}
