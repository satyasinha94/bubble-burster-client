import {BASEURL} from ".././Helpers/API"

export function getArtists() {
  return (dispatch) => {
    return fetch(`${BASEURL}/api/v1/artists`, {
				headers: {
					"Authorization": localStorage.getItem("jwt")
				}
			})
			.then(res => res.json())
			.then(myJson => dispatch({type: "GET_ARTISTS", payload: myJson.data}))
    }
  }
