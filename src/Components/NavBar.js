import React from 'react'
import { Menu, Image, Popup} from 'semantic-ui-react'
import { BrowserRouter as Switch, NavLink} from 'react-router-dom';
import {connect} from "react-redux"
import {logout} from ".././Actions/AuthActions"
import {deleteAccount} from ".././Actions/AuthActions"

const NavBar = props => {

  return (
    <React.Fragment>
      <Menu color="black">
        <Popup
        trigger={<Menu.Item  as={NavLink} to="/tracks"  name= "Top Tracks" > Top Tracks </Menu.Item>}
        content='You can zoom in on any bubble and click to play the track!'
        on='hover'
        />
        <Popup
        trigger={<Menu.Item  as={NavLink} to="/artists" name= "Top Artists"> Top Artists </Menu.Item>}
        content='You can zoom in on any bubble and click to play the track!'
        on='hover'
        />
        <Popup
        trigger={<Menu.Item  as={NavLink} to="/genres" name= "Top Genres" > Top Genres </Menu.Item>}
        content='You can zoom in on any bubble and click to play the track!'
        on='hover'
        />
        {props.auth.LoggedIn ? <Menu.Item  as={NavLink} to="/" name= "Logout" onClick = {props.logout}> Logout </Menu.Item> : null }
        <Menu.Item as={NavLink} to="/" name= "Delete" onClick = {props.deleteAccount}> Delete Account </Menu.Item>
        <Menu.Item position="right">
          <Image src={props.auth.user.profile_img_url} avatar/>
          <span>{props.auth.user.username}</span>
        </Menu.Item>
      </Menu>
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
