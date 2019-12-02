import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Login from './Containers/Login'
import HomePage from './Containers/HomePage'
import {connect} from "react-redux"
import {authorize} from "./Actions/AuthActions"
import {checkAuthorization} from "./Actions/AuthActions"
import {addPlayer} from "./Actions/AuthActions"
import {updatePlayBack} from "./Actions/PlayerActions"
import {updateAccess} from "./Helpers/SpotifyAPI"
import {checkIfTrackSaved} from "./Actions/PlayerActions"
import {transferPlayBack} from "./Helpers/SpotifyAPI"
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
      .then(() => {
        if (this.props.auth.user.expires_in <= 0) {
          updateAccess()
        }
      })
      this.checkForPlayerInterval = setInterval(() => this.checkForPlayer(), 1000)
      this.updateAccessInterval = setInterval(() => updateAccess(), 3000000)
		}
    else if (localStorage.getItem("jwt")) {
      this.props.checkAuthorization()
      .then(() => this.props.history.push("/"))
      .then(() => {
        if (this.props.auth.user.expires_in <= 0) {
          updateAccess()
        }
      })
      this.checkForPlayerInterval = setInterval(() => this.checkForPlayer(), 1000)
      this.updateAccessInterval = setInterval(() => updateAccess(), 3000000)
    }
  }

  checkForPlayer = () => {
    if (window.Spotify) {
      console.log('checking for player')
      clearInterval(this.checkForPlayerInterval)
      let player = new window.Spotify.Player({
        name: 'Bubble Burster Player',
        getOAuthToken: cb => { cb(localStorage.getItem('access_token')); }
      })
      player.connect()
      player.addListener('initialization_error', ({ message }) => { 
        console.error("Initialization error: ", message);
        updateAccess().then(() => this.checkForPlayer()) 
      });
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        updateAccess().then(() => this.checkForPlayer())
      });
      player.addListener('ready', () => {
          console.log('player ready')
          // CHROME 74 CHANGED IFRAME LOADING, NEED TO UPDATE STYLE.DISPLAY FOR MUSIC TO PLAY.
          const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
          if (iframe) {
          	iframe.style.display = 'block';
          	iframe.style.position = 'absolute';
          	iframe.style.top = '-1000px';
          	iframe.style.left = '-1000px';
          }
          this.props.addPlayer(player)
          transferPlayBack(player)
      })
      player.addListener('player_state_changed', state => {
        this.props.updatePlayBack(state)
        state.track_window && this.props.checkIfTrackSaved(state.track_window.current_track.id)
      });
      player.on('authentication_error', ({ message }) => {
        console.log(message, 'RE-AUTHENTICATING')
        updateAccess().then(() => this.checkForPlayer())
      });
      player.on('playback_error', ({ message }) => {
        console.error(message, 'Failed to perform playback');
        updateAccess()
        player.pause()
      });
    }
  }

  render() {
    return (
        <React.Fragment>
          {this.props.auth.LoggedIn ? <HomePage /> : <Login/>}
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
    updatePlayBack,
    checkIfTrackSaved
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
