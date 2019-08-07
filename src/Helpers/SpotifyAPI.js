export function updateAccess() {
    return fetch(`${process.env.REACT_APP_BASEURL}/api/v1/refresh`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    })
    .then(r => r.json())
    .then(myJson => {
      console.log('ACCESS UPDATED')
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
    .then(r => {
      if (r.status !== 204) {
        updateAccess().then(() => playTrack(uri))
      }
      if (r.status === 429) {
        window.alert('rate limit exceeded! Please refresh.')
      }
    })
  }
