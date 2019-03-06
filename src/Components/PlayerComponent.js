import React, {Component} from 'react'
import {connect} from "react-redux"
import {Menu, Button, Icon, Image, Header, Transition, Segment} from 'semantic-ui-react'

class Player extends Component {
  renderSidebar = () => {
    return <div className="footer">
      <Transition visible={!this.props.playBack.playBack.paused} animation='scale' duration={750}>
        <div>
        <Segment size="mini" basic>
          <Header as="h4">Now Playing</Header>
            <Image src={this.props.image} size="mini"/>
            <Menu.Item>Artist:{this.props.artist && (this.props.artist.length > 25 ? this.props.artist.slice(0, 25) + "..." : this.props.artist)}</Menu.Item>
            <Menu.Item>Album:{this.props.album && (this.props.album.length > 25 ? this.props.album.slice(0, 25) + "..." : this.props.album)}</Menu.Item>
            <Menu.Item>Track: {this.props.track && (this.props.track.length > 25 ? this.props.track.slice(0, 25) + "..." : this.props.track)} </Menu.Item>
            <Menu.Item><Icon name="pause" floated="left" size="large" onClick={() => this.props.player.pause()}/></Menu.Item>
        </Segment>
        </div>
      </Transition>
    </div>
  }
render() {
    return <div className="footer-container">
      {this.renderSidebar()}
    </div>
  }
}

const mapStateToProps = (state) => {
  let artist
  let track
  let image
  let album
  if (Object.keys(state.playBack.playBack).length === 0) {
    let artist = ""
    let track = ""
    let image = ""
    let album = ""
  }
  else {
    artist = state.playBack.playBack.track_window.current_track.artists[0].name
    track = state.playBack.playBack.track_window.current_track.name
    image = state.playBack.playBack.track_window.current_track.album.images[1].url
    album = state.playBack.playBack.track_window.current_track.album.name
  }
  return {
    player: state.auth.player,
    playBack: state.playBack,
    artist,
    track,
    image,
    album
    }
}

export default connect(mapStateToProps)(Player)
