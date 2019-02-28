import React from 'react'
import { Menu, Image} from 'semantic-ui-react'
import { BrowserRouter as Switch, NavLink} from 'react-router-dom';
import {connect} from "react-redux"
import {logout} from ".././Actions/AuthActions"

const NavBar = props => {

  return (
      <Menu color="black">
        <Menu.Item  as={NavLink} to="/tracks"  name= "Top Tracks" > Top Tracks </Menu.Item>
        <Menu.Item  as={NavLink} to="/artists" name= "Top Artists"> Top Artists </Menu.Item>
        <Menu.Item  as={NavLink} to="/genres" name= "Top Genres" > Top Genres </Menu.Item>
        {props.auth.LoggedIn ? <Menu.Item  as={NavLink} to="/" name= "Logout" onClick = {props.logout}> Logout </Menu.Item> : null }
        <Menu.Item position="right">
          <Image src={props.auth.user.profile_img_url} avatar/>
          <span>{props.auth.user.username}</span>
        </Menu.Item>
      </Menu>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.user
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
