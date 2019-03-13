
export function authorize(id) {
  return (dispatch) => {
  return fetch(`https://bubble-burster-api.herokuapp.com/api/v1/users/${id}`)
    .then(r => r.json())
    .then(myJson => {
      localStorage.setItem("jwt", myJson.jwt)
      localStorage.setItem("access_token", myJson.user.access_token)
      localStorage.setItem("refresh_token", myJson.user.refresh_token)
      return dispatch({type: "LOGIN", payload: myJson.user})
    })
  }
}

export function logout() {
    return {
      type: "LOGOUT"
    }
  }

  export function checkAuthorization() {
    return (dispatch) => {
      return fetch(`https://bubble-burster-api.herokuapp.com/api/v1/logged_in`, {
  				headers: {
  					"Authorization": localStorage.getItem("jwt")
  				}
  			})
  			.then(res => res.json())
  			.then(myJson => {
          dispatch({type: "LOGIN", payload: myJson.user})})
      }
    }

  export function addPlayer(player) {
    return {
      type: "ADD_PLAYER",
      payload: player
    }
  }

  export function deleteAccount() {
    return (dispatch) => {
      return fetch(`https://bubble-burster-api.herokuapp.com/api/v1/delete_user`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        }
      })
      .then(() => {
        dispatch({type: "LOGOUT"})
      })
    }
  }
