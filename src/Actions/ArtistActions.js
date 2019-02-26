export function getArtists() {
  return (dispatch) => {
    return fetch(`http://localhost:3000/artists`, {
				headers: {
					"Authorization": localStorage.getItem("jwt")
				}
			})
			.then(res => res.json())
			.then(myJson => dispatch({type: "GET_ARTISTS", payload: myJson.data}))
    }
  }
