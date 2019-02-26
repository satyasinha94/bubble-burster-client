import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux"
import {getArtists} from ".././Actions/ArtistActions"
import {bubbleChart} from '.././Components/BubbleChart'
class Artists extends Component {

  state = {
    mappedArtists: []
  }

  componentDidMount(){
    console.log("artists")
    this.props.getArtists()
    .then(() => {
      this.mapArtists(this.props.artists.artists)
    })
  }

  mapArtists = (artists) => {
    let mapArtistPopularity = artists.map(artist => {
      let popularity = artist.relationships["user-artists"].data[0].popularity
      return {...artist, popularity: popularity}
    })
    this.setState({
      mappedArtists: mapArtistPopularity
    })
  }

  render(){
    return (
      <svg id="viz">Artists</svg>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists
    }
}

const mapDispatchToProps = {
    getArtists
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists)
