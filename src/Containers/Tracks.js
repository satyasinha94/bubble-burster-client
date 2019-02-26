import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux"
import {getTracks} from ".././Actions/TrackActions"

class Tracks extends Component {

  componentDidMount(){
    console.log("tracks")
    this.props.getTracks()
    .then(() => {
      this.mapTracks(this.props.tracks.tracks)
    })
  }
  mapTracks = (tracks) => {
    let mapTrackPopularity = tracks.map(track => {
      let popularity = track.relationships["user-tracks"].data[0].popularity
      return {...track, popularity: popularity}
    })
    this.setState({
      mappedTracks: mapTrackPopularity
    })
  }

  render() {
    return (
      <div>Tracks</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks
    }
}

const mapDispatchToProps = {
    getTracks
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracks)
