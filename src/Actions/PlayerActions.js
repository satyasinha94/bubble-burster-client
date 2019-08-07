export function updatePlayBack(playbackInfo) {
  return {
    type: "UPDATE_PLAYBACK",
    payload: playbackInfo
  }
}

export function checkIfTrackSaved(id) {
  return (dispatch) => {
    return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(r => r.json())
    .then(myJson => dispatch({type: "UPDATE_TRACK_STATUS", payload: myJson[0]}))
  }
}
