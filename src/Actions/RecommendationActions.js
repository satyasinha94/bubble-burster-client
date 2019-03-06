export function getAllRecs() {
export function getGenreRecs() {
  return (dispatch) => {
    console.log("getting genre recs")
    return fetch(`http://localhost:3000/genre_recs`, {
				headers: {
					"Authorization": localStorage.getItem("jwt")
				}
			})
			.then(res => res.json())
			.then(myJson => dispatch({type: "GET_GENRE_RECOMMENDATIONS", payload: myJson.data}))
    }
  }

  export function getArtistRecs() {
    return (dispatch) => {
      console.log("getting artist recs")
      return fetch(`http://localhost:3000/artist_recs`, {
  				headers: {
  					"Authorization": localStorage.getItem("jwt")
  				}
  			})
  			.then(res => res.json())
  			.then(myJson => dispatch({type: "GET_ARTIST_RECOMMENDATIONS", payload: myJson.data}))
      }
    }

  export function getTrackRecs() {
    return (dispatch) => {
      console.log("getting track recs")
      return fetch(`http://localhost:3000/track_recs`, {
          headers: {
            "Authorization": localStorage.getItem("jwt")
          }
        })
        .then(res => res.json())
        .then(myJson => dispatch({type: "GET_TRACK_RECOMMENDATIONS", payload: myJson.data}))
      }
    }
