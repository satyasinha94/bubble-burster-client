// export const BASEURL = "http://localhost:3000"
export const BASEURL = "https://bubble-burster-api.herokuapp.com"

export function updateAccess() {
    return fetch(`${BASEURL}/api/v1/refresh`, {
      headers: {
        "Authorization": localStorage.getItem("jwt")
      }
    })
    .then(r => r.json())
    .then(myJson => {
      console.log('UPDATING ACCESS TOKEN')
      localStorage.setItem("access_token", myJson.access_token)
    })
}
