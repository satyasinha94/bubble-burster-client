import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './Login'
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
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Welcome to Bubble Burster'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
        fontFamily: 'Rock Salt'
      }}
    />
    <Header
      as='h2'
      content='Get out of your music bubble.'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
)

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
