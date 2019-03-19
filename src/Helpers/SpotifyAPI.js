export function updateAccess() {
    return fetch(`${process.env.REACT_APP_BASEURL}/api/v1/refresh`, {
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
    .then(r => {
      if (r.status === 401) {
        updateAccess().then(() => playTrack(uri))
      }
    })
  }

// export function addToQueue(id) {
//     fetch(`https://api.spotify.com/v1/recommendations?limit=1&market=US&seed_tracks=${id}`, {
//       headers: {
//         authorization: `Bearer ${localStorage.getItem('access_token')}`,
//         "Content-Type": "application/json",
//       }
//     })
//     .then(r => r.json())
//     .then(myJson => {
//       debugger
//     })
//   }
//
