import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from '../Components/NavBar'
import {connect} from "react-redux"
import {logout} from ".././Actions/AuthActions"
import Artists from './Artists'
import Genres from './Genres'
import Tracks from './Tracks'


/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */


class DesktopContainer extends Component {

  render() {

    return (
      <div>
      <Router>
        <React.Fragment>
          <NavBar />
          <Route exact path="/tracks" component={Tracks}/>
          <Route exact path="/genres" component={Genres}/>
          <Route exact path="/artists" component={Artists}/>
        </React.Fragment>
      </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopContainer)
