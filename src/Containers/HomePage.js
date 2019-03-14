import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from '../Components/NavBar'
import {connect} from "react-redux"
import {logout} from ".././Actions/AuthActions"
import Artists from './Artists'
import Genres from './Genres'
import Tracks from './Tracks'
import Player from '../Components/PlayerComponent'
import {Modal, Header} from 'semantic-ui-react'


/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */


class HomePage extends Component {

  render() {

    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <Route exact path="/tracks" component={Tracks}/>
          <Route exact path="/genres" component={Genres}/>
          <Route exact path="/artists" component={Artists}/>
          <Player/>
          <Modal defaultOpen closeIcon>
            <Modal.Content>
              <Header textAlign="center">
                Welcome to Bubble Burster!
              </Header>
              <Header.Subheader textAlign="center">
                Click on Top Tracks, Top Artists, or Genres in the NavBar to see your listening habits and get song recommendations.
              </Header.Subheader>
            </Modal.Content>
          </Modal>
        </React.Fragment>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    player: state.player,
    playBack: state.playBack
    }
}

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
