export function getGenreRecs() {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_BASEURL}/api/v1/genre_recs`, {
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
      return fetch(`${process.env.REACT_APP_BASEURL}/api/v1/artist_recs`, {
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
      return fetch(`${process.env.REACT_APP_BASEURL}/api/v1/track_recs`, {
          headers: {
            "Authorization": localStorage.getItem("jwt")
          }
        })
        .then(res => res.json())
        .then(myJson => dispatch({type: "GET_TRACK_RECOMMENDATIONS", payload: myJson.data}))
      }
    }
