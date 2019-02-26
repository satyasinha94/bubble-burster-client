export default (
  state={
  LoggedIn: false,
  user: {
    username: null,
    spotify_url: null,
    profile_img_url: null}
  }, action) => {
  switch(action.type){
    case ("LOGIN"):
      console.log("logged in")
      return {...state, user: action.payload, LoggedIn: true}
    case ("LOGOUT"):
      localStorage.removeItem("jwt")
      console.log("logged out")
      window.history.go("/")
      return {...state, LoggedIn: false, user:{username: null, spotify_url: null, profile_img_url: null}}
    default:
      return state
  }
}
