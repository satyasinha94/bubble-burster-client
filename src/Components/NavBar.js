import React from 'react'
import { Menu } from 'semantic-ui-react'
import { BrowserRouter as Switch, Link, Route, Router } from 'react-router-dom';
import {connect} from "react-redux"
import {logout} from ".././Actions/AuthActions"
import Artists from ".././Containers/Artists"
import Genres from ".././Containers/Genres"
import Tracks from ".././Containers/Tracks"

const NavBar = props => {

  return (
      <Menu color="green">
        <Menu.Item  as={Link} to="/tracks"  name= "Top Tracks" > Top Tracks </Menu.Item>
        <Menu.Item  as={Link} to="/artists" name= "Top Artists"> Top Artists </Menu.Item>
        <Menu.Item  as={Link} to="/genres" name= "Top Genres" > Top Genres </Menu.Item>
        {props.auth.LoggedIn ? <Menu.Item name= "Logout" onClick = {props.logout}> Logout </Menu.Item> : null }
      </Menu>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
