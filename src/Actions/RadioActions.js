export function radioOn() {
  return {
    type: "RADIO_ON"
  }
}

export function radioOff() {
  return {
    type: "RADIO_OFF"
  }
}

export function addToQueue(id) {
  return (dispatch) => {
    fetch(`https://api.spotify.com/v1/recommendations?market=US&seed_tracks=${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": "application/json",
      }
    })
    .then(r => r.json())
    .then(myJson => dispatch({type: "ADD_TRACKS_TO_QUEUE", payload: myJson.tracks.map(track => track.uri)}))
  }
}

export function clearQueue() {
  console.log('CLEARING QUEUE')
  return {
    type: "CLEAR_QUEUE"
  }
}

export function updateQueue(queue) {
  console.log('UPDATING QUEUE')
  return {
    type: "UPDATE_QUEUE",
    payload: queue.slice(1)
  }
}
