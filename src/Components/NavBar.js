import React from 'react'
import { BrowserRouter as Switch, NavLink} from 'react-router-dom';
import {connect} from "react-redux"
import {logout} from ".././Actions/AuthActions"
import {deleteAccount} from ".././Actions/AuthActions"

const NavBar = props => {

  return (
    <React.Fragment>
      <nav className="nav">
        <NavLink to="/tracks"  name= "Top Tracks"> Top Tracks</NavLink>
        <NavLink to="/artists" name= "Top Artists"> Top Artists</NavLink>
        <NavLink to="/genres" name= "Top Genres"> Top Genres</NavLink>
        {props.auth.LoggedIn ?
        <NavLink to="/" name= "Logout" onClick = {props.logout}> Logout</NavLink>  : null }
        <NavLink to="/" name= "Delete" onClick = {props.deleteAccount}> Delete Account</NavLink>
        <img src={props.auth.user.profile_img_url} alt="Avatar" className="avatar"/>
      </nav>
      <span className="profile">{props.auth.user.username.split(" ")[0]}</span>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.user
    }
}

const mapDispatchToProps = {
    logout,
    deleteAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
