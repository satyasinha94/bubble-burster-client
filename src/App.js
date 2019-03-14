import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Login from './Containers/Login'
import DesktopContainer from './Containers/HomePage'
import {connect} from "react-redux"
import {authorize} from "./Actions/AuthActions"
import {checkAuthorization} from "./Actions/AuthActions"
import {addPlayer} from "./Actions/AuthActions"
import {updatePlayBack} from "./Actions/PlayerActions"
import {updateAccess} from "./Helpers/API"
import './App.css';

class App extends Component {

  constructor(props) {
  super(props);
  this.checkForPlayerInterval = null
  this.updateAccessInterval = null;
}

  componentDidMount(){
    if (window.location.href.includes("user_id")) {
      let id = parseInt(window.location.href.split("=")[1])
      this.props.authorize(id)
      .then(() => this.props.history.push("/"))
      this.checkForPlayerInterval = setInterval(() => this.checkForPlayer(), 1000)
      this.updateAccessInterval = setInterval(() => updateAccess(), 3000000)
		}
    else if (localStorage.getItem("jwt")) {
      this.props.checkAuthorization()
      .then(() => this.props.history.push("/"))
      this.checkForPlayerInterval = setInterval(() => this.checkForPlayer(), 1000)
      this.updateAccessInterval = setInterval(() => updateAccess(), 3000000)
    }
  }


  transferPlayBack = (player) => {
    fetch("https://api.spotify.com/v1/me/player", {
     method: "PUT",
     headers: {
       authorization: `Bearer ${localStorage.getItem('access_token')}`,
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       "device_ids": [`${player._options.id}`],
       "play": false,
     })
   })
  }

  checkForPlayer = () => {
    if (window.Spotify) {
      clearInterval(this.checkForPlayerInterval)
      const token = localStorage.getItem('access_token')
      const player = new window.Spotify.Player({
        name: 'Mixocracy Player',
        getOAuthToken: cb => { cb(token); }
      })
      player.connect()
      player.addListener('ready', () => {
          this.props.addPlayer(player)
          this.transferPlayBack(player)
      })
      player.addListener('player_state_changed', state => this.props.updatePlayBack(state));
  }
    else {
      console.log('player not ready')
    }
  }

  render() {
    return (
        <React.Fragment>
          {this.props.auth.LoggedIn ? <DesktopContainer /> : <Login/>}
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    }
}

const mapDispatchToProps = {
    authorize,
    checkAuthorization,
    addPlayer,
    updatePlayBack
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
