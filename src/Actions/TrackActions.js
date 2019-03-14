import {BASEURL} from ".././Helpers/API"

export function getTracks() {
  return (dispatch) => {
    return fetch(`${BASEURL}/api/v1/tracks`, {
				headers: {
					"Authorization": localStorage.getItem("jwt")
				}
			})
			.then(res => res.json())
			.then(myJson => dispatch({type: "GET_TRACKS", payload: myJson.data}))
    }
  }
