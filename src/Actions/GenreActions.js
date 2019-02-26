export function getGenres() {
  return (dispatch) => {
    return fetch(`http://localhost:3000/genres`, {
				headers: {
					"Authorization": localStorage.getItem("jwt")
				}
			})
			.then(res => res.json())
			.then(myJson => dispatch({type: "GET_GENRES", payload: myJson.data}))
    }
  }
