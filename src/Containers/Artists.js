import React, {Component} from 'react'
import {connect} from "react-redux"
import {getArtists} from ".././Actions/ArtistActions"
import {getArtistRecs} from ".././Actions/RecommendationActions"
import {Grid, Header} from "semantic-ui-react"
import { VictoryGroup, VictoryScatter, VictoryLegend, VictoryLabel, VictoryZoomContainer, VictoryTooltip } from 'victory'
class Artists extends Component {

  state = {
    mappedArtists: []
  }

  componentDidMount(){
    console.log("artists")
    this.props.getArtists()
    .then(() => this.props.getArtistRecs())
    .then(() => this.mapArtists(this.props.artists.artists))
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
      <React.Fragment>
        <Grid className="chart">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header as='h2' textAlign='center'>
                  My Tracks
                </Header>
                <VictoryScatter
                padding={65}
                containerComponent={<VictoryZoomContainer zoomDomain={{x: [0, 100], y: [0, 100]}}/>}
                style={{
                  data: { fill: "#c43a31" },
                  labels: {fontSize: 10} }
                }
                bubbleProperty="popularity"
                maxBubbleSize={20}
                minBubbleSize={2.5}
                data={this.state.mappedArtists.map((artist, index) => {
                  return {x: index + 100 , y:Math.random(0,100), label: artist.name, popularity: artist.popularity}})
                }
                labels={this.state.mappedArtists.map(artist => `${artist.attributes.name}
                  Popularity: ${artist.popularity}`)}
                labelComponent={<VictoryLabel dy={-10}/>}
                  />
                  </Grid.Column>
                  <Grid.Column>
                  <Header as='h2' textAlign='center'>
                    My Recommendations
                  </Header>
                  <VictoryScatter
                  containerComponent={<VictoryZoomContainer zoomDomain={{x: [0, 100], y: [0, 100]}}/>}
                  padding={65}
                  style={{
                    data: { fill: "blue" },
                    labels: {fontSize: 9} }
                  }
                  size={15}
                  data={this.props.artist_recommendations.map((track, index) => {
                    return {x: index + 100 , y:Math.random(0,100) , name: track.name}})
                  }
                  labels={this.props.artist_recommendations.map(track => `${track.attributes.name} - ${track.attributes["artist-name"]}`)}
                  labelComponent={<VictoryLabel dy={-10}/>}
                  />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artists,
    user: state.auth.user,
    artist_recommendations: state.recs.artist_recommendations
    }
}

const mapDispatchToProps = {
    getArtists,
    getArtistRecs
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists)
