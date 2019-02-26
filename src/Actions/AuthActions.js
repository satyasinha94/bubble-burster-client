
export function authorize(id) {
  return (dispatch) => {
  return fetch(`http://localhost:3000/api/v1/users/${id}`)
    .then(r => r.json())
    .then(myJson => {
      localStorage.setItem("jwt", myJson.jwt)
      return dispatch({type: "LOGIN", payload: myJson.user})
    })
  }
}

export function logout() {
    return {
      type: "LOGOUT"
    }
  }
