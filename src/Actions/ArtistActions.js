export function getArtists() {
  return (dispatch) => {
    return fetch(`${process.env.REACT_APP_BASEURL}/api/v1/artists`, {
				headers: {
					"Authorization": localStorage.getItem("jwt")
				}
			})
			.then(res => res.json())
			.then(myJson => dispatch({type: "GET_ARTISTS", payload: myJson.data}))
    }
  }
