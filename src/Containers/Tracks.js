import React, {Component} from 'react'
import {connect} from "react-redux"
import {getTracks} from ".././Actions/TrackActions"
import {getTrackRecs} from ".././Actions/RecommendationActions"
import {Grid} from "semantic-ui-react"
import { VictoryGroup, VictoryScatter, VictoryLegend, VictoryLabel } from 'victory'

class Tracks extends Component {

  state = {
    mappedTracks: []
  }

  componentDidMount(){
    console.log("tracks")
    this.props.getTracks()
    .then(() => {
      this.mapTracks(this.props.tracks.tracks)
    })
    this.props.getTrackRecs()
  }
  mapTracks = (tracks) => {
    let mapTrackPopularity = tracks.map(track => {
      let popularity = track.relationships["user-tracks"].data.find(d => d.username === this.props.user.username).popularity
      return {...track, popularity: popularity}
    })
    this.setState({
      mappedTracks: mapTrackPopularity
    })
  }

  render() {
    return (
      <React.Fragment>
        <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
              <VictoryGroup>
                <VictoryScatter
                style={{
                  data: { fill: "#c43a31" },
                  labels: {fontSize: 6} }
                }
                bubbleProperty="popularity"
                maxBubbleSize={13.5}
                minBubbleSize={5}
                data={this.state.mappedTracks.map((track, index) => {
                  return {x: index + 900 , y:Math.random(0,100), popularity: track.popularity}})
                }
                labels={this.state.mappedTracks.map(track => `${track.attributes.name}
                  Popularity: ${track.popularity}`)}
                labelComponent={<VictoryLabel dy={-10}/>}
                  />
                </VictoryGroup>
                  </Grid.Column>
                  <Grid.Column>
                  <VictoryScatter
                  style={{
                    data: { fill: "blue" },
                    labels: {fontSize: 6} }
                  }
                  size={13}
                  data={this.props.track_recommendations.map((track, index) => {
                    return {x: index + 900 , y:Math.random(0,100) , name: track.name}})
                  }
                  labels={this.props.track_recommendations.map(track => track.attributes.name)}
                  labelComponent={<VictoryLabel dy={-10}/>}
                  />
              </Grid.Column>
            </Grid.Row>
            <Grid.Column>
              <VictoryLegend/>
            </Grid.Column>
          </Grid>
        </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    user: state.auth.user,
    track_recommendations: state.recs.track_recommendations
    }
}

const mapDispatchToProps = {
    getTracks,
    getTrackRecs
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracks)
