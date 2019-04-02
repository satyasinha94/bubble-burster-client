export default (
  state={
  LoggedIn: false,
  player: {},
  user: {
    username: null,
    spotify_url: null,
    profile_img_url: null,
    access_token: null,
    expires_in: null}
  }, action) => {
  switch(action.type){
    case ("LOGIN"):
      console.log("logged in")
      return {...state, user: action.payload, LoggedIn: true}
    case ("LOGOUT"):
      localStorage.removeItem("jwt")
      localStorage.removeItem("access_token")
      state.player.disconnect()
      console.log("logged out")
      window.history.go("/")
      return {...state, LoggedIn: false, user:{username: null, spotify_url: null, profile_img_url: null, access_token: null, expires_in: null}}
    case ("ADD_PLAYER"):
      return {...state, player: action.payload}
    default:
      return state
  }
}
