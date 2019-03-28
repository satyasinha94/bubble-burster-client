import React, {Component} from 'react'
import {connect} from "react-redux"
import {radioOn, radioOff, addToQueue, clearQueue, updateQueue} from ".././Actions/RadioActions"
import {checkIfTrackSaved} from ".././Actions/PlayerActions"
import {playTrack} from ".././Helpers/SpotifyAPI"
import radio from '.././Images/radio.png'
import radio_black from '.././Images/radio_black.png'
import {Menu, Icon, Image, Header, Transition, Segment} from 'semantic-ui-react'

class Player extends Component {

  likeToggle = (e, id) => {
    if (this.props.trackSaved) {
      this.saveOrDeleteTrack(id, "DELETE").then(() => this.props.checkIfTrackSaved(id))
    }
    else {
      this.saveOrDeleteTrack(id, "PUT").then(() => this.props.checkIfTrackSaved(id))
    }
  }

  saveOrDeleteTrack = (id, method) => {
    return fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
      method: method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  }

  radioToggle = (id) => {
    if (!this.props.radio) {
      this.props.radioOn()
      this.props.clearQueue()
      this.props.addToQueue(id)
    }
    else if (this.props.radio) {
    this.props.radioOff()
    this.props.clearQueue()
    this.forceUpdate()
    }
  }

  pause = () => {
    this.props.radioOff()
    this.props.clearQueue()
    this.props.player.pause()
  }

  shouldComponentUpdate(nextProps) {
  if (this.props.queue.length !== nextProps.queue.length) {
      return false
    }
  return true
}

  componentDidUpdate() {
    if (this.props.radio && this.props.queue.length < 5) {
      this.props.addToQueue(this.props.id)
    }
    if (this.props.radio && this.props.paused ) {
      playTrack(this.props.queue[0])
      this.props.updateQueue(this.props.queue)
    }
  }

  skipTrack = () => {
    if (this.props.radio) {
      this.props.updateQueue(this.props.queue)
      playTrack(this.props.queue[0])
    }
  }


  renderSidebar = () => {
    return <div className="footer">
      <Transition visible={!this.props.paused} animation='scale' duration={750}>
        <div>
        <Segment size="mini" basic>
          <Header as="h4">Now Playing</Header>
          <div className="like">
            <Image src={this.props.image} size="mini"/>
            {this.props.trackSaved ? <Icon name="heart" size="big" color="red" onClick={(e) => this.likeToggle(e, this.props.id)}/> : <Icon name="heart outline" size="big" onClick={(e) => this.likeToggle(e, this.props.id)}/>}
            {!this.props.radio ? <Image className="radio" src={radio} onClick={() => this.radioToggle(this.props.id)}/> : <Image className="radio" src={radio_black} onClick={() => this.radioToggle(this.props.id)}/> }
          </div>
            <Menu.Item>Artist:{this.props.artist && (this.props.artist.length > 25 ? this.props.artist.slice(0, 25) + "..." : this.props.artist)}</Menu.Item>
            <Menu.Item>Album:{this.props.album && (this.props.album.length > 25 ? this.props.album.slice(0, 25) + "..." : this.props.album)}</Menu.Item>
            <Menu.Item>Track: {this.props.track && (this.props.track.length > 25 ? this.props.track.slice(0, 25) + "..." : this.props.track)} </Menu.Item>
            <div className="radio-controls">
              <Menu.Item><Icon name="pause" floated="left" size="large" onClick={this.pause}/></Menu.Item>
              <Menu.Item><Icon name="forward" size="large" onClick={this.skipTrack}/></Menu.Item>
            </div>
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
  let artist,
      track,
      image,
      album,
      id,
      radio,
      paused,
      queue = state.radio.queue
  if (Object.keys(state.playBack.playBack).length === 0) {
     artist = ""
     track = ""
     image = ""
     album = ""
     id = ""
     radio = ""
     paused = ""
  }
  else if (!state.playBack.playBack) {
    window.alert('playback error! Please refresh.')
  }
  else {
    artist = state.playBack.playBack.track_window.current_track.artists[0].name
    track = state.playBack.playBack.track_window.current_track.name
    image = state.playBack.playBack.track_window.current_track.album.images[1].url
    album = state.playBack.playBack.track_window.current_track.album.name
    id = state.playBack.playBack.track_window.current_track.id
    radio = state.radio.radio
    paused = state.playBack.playBack.paused
  }
  return {
    player: state.auth.player,
    artist,
    track,
    image,
    album,
    id,
    trackSaved: state.playBack.trackSaved,
    radio,
    paused,
    queue
    }
}

const mapDispatchToProps = {
  checkIfTrackSaved,
  radioOn,
  radioOff,
  addToQueue,
  clearQueue,
  updateQueue
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
