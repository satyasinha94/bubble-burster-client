// export const BASEURL = "http://localhost:3000"
export const BASEURL = "https://bubble-burster-api.herokuapp.com"

export function updateAccess() {
    return fetch(`${BASEURL}/api/v1/refresh`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    })
    .then(r => r.json())
    .then(myJson => {
      localStorage.setItem("access_token", myJson.access_token)
    })
}

export function playTrack(uri) {
  fetch("https://api.spotify.com/v1/me/player/play", {
   method: "PUT",
   headers: {
     authorization: `Bearer ${localStorage.getItem('access_token')}`,
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     "uris": [`${uri}`]
   })
 })
}
