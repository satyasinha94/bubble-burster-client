import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux"
import {getArtists} from ".././Actions/ArtistActions"
import { VictoryGroup, VictoryScatter, VictoryLabel } from 'victory'
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
      let popularity = artist.relationships["user-artists"].data.find(d => d.username === this.props.user.username).popularity
      return {...artist, popularity: popularity}
    })
    this.setState({
      mappedArtists: mapArtistPopularity
    })
  }

  render(){
    return (
      <VictoryGroup>
        <VictoryScatter
          style={{
            data: { fill: "#c43a31" },
            labels: {fontSize: 6} }
          }
          bubbleProperty="popularity"
          maxBubbleSize={20}
          minBubbleSize={2.5}
          data={this.state.mappedArtists.map((artist, index) => {
            return {x: Math.random(0,10000), y: Math.random(0,10000), popularity: artist.popularity}})
          }
          labels={this.state.mappedArtists.map(artist => `${artist.attributes.name} : ${artist.popularity}`)}

        />
        </VictoryGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists,
    user: state.auth.user
    }
}

const mapDispatchToProps = {
    getArtists
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists)
