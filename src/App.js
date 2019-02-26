import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import Login from './Containers/Login'
import DesktopContainer from './Containers/HomePage'
import {connect} from "react-redux"
import {authorize} from "./Actions/AuthActions"
import logo from './logo.svg';
import './App.css';
import Artists from './Containers/Artists'
import Genres from './Containers/Genres'
import Tracks from './Containers/Tracks'

class App extends Component {

  componentDidMount(){
    if (window.location.href.includes("user_id")) {
      let id = parseInt(window.location.href.split("=")[1])
      this.props.authorize(id)
      .then(() => this.props.history.push("/"))
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
    auth: state.auth
    }
}

const mapDispatchToProps = {
    authorize
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
