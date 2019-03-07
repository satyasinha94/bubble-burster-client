import React, {Component} from 'react'
import {connect} from "react-redux"
import {getTracks} from ".././Actions/TrackActions"
import {getTrackRecs} from ".././Actions/RecommendationActions"
import {Grid, Button, Header, Loader} from "semantic-ui-react"
import { VictoryGroup, VictoryLegend, VictoryZoomContainer } from 'victory'
import {VictoryScatter, VictoryLabel, createContainer } from 'victory'
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

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

  playTrack = (uri) => {
    fetch("https://api.spotify.com/v1/me/player/play", {
     method: "PUT",
     headers: {
       authorization: `Bearer ${localStorage.getItem('access_token')}`,
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       "uris": [`${uri}`]
     })
   })
  }

  render() {
    return (
      <React.Fragment>
        <Grid columns={2}>
              <Grid.Column>
                <Header as='h2' textAlign='center'>
                  My Top Tracks
                </Header>
                {this.state.mappedTracks.length === 0 ?
                  <Loader active size="huge" inline='centered'>Loading Tracks</Loader> : null}
                <VictoryScatter
                animate={{ duration: 150 }}
                width={600}
                height={600}
                padding={ {top: 100, bottom: 150, left: 100, right: 100} }
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    labels={(datum) => `${datum.name}, Popularity: ${datum.popularity}`}
                  />
                }
                style={{
                  data: { fill: "#fa4659" },
                  labels: {fontSize: 12.5},
                }
                }
                bubbleProperty="popularity"
                maxBubbleSize={22}
                minBubbleSize={3.5}
                data={this.state.mappedTracks.map((track, index) => {
                  return {x: index + 75 , y:Math.random(0,100), uri: track.attributes.uri, popularity: track.popularity, name: track.attributes.name}})
                }
                labels={this.state.mappedTracks.map(track => `${track.attributes.name}
                  Popularity: ${track.popularity}`)}
                labelComponent={<VictoryLabel dy={-17.5}/>}
                events={[
                 {
                   target: "data",
                   eventHandlers: {
                     onClick: () => ({
                       target: "data",
                       mutation: (evt) => this.playTrack(evt.datum.uri)
                     })
                   }
                 }
               ]}
                  />
                  </Grid.Column>
                  <Grid.Column>
                  <Header as='h2' textAlign='center'>
                    My Recommendations
                  </Header>
                  <Button onClick={this.props.getTrackRecs}>Update Recommendations</Button>
                  <VictoryScatter
                  animate={{ duration: 150 }}
                  width={600}
                  height={600}
                  containerComponent={<VictoryZoomVoronoiContainer
                    labels={(d) => `${d.artist_name} - ${d.name}`}
                  />}
                  padding={ {top: 100, bottom: 150, left: 100, right: 100} }
                  style={{
                    data: { fill: "#11cbd7" },
                    labels: {fontSize: 12.5}
                  }
                  }
                  bubbleProperty="popularity"
                  maxBubbleSize={22}
                  minBubbleSize={3.5}
                  data={this.props.track_recommendations.map((track, index) => {
                    return {x: index + 75 , y:Math.random(0,100), uri: track.attributes.uri, popularity: track.attributes.popularity, name: track.attributes.name, artist_name: track.attributes["artist-name"]}})
                  }
                  labels={this.props.track_recommendations.map(track => `${track.attributes["artist-name"]} - ${track.attributes.name}`)}
                  labelComponent={<VictoryLabel dy={-17.5}/>}
                  events={[
                   {
                     target: "data",
                     eventHandlers: {
                       onClick: () => ({
                         target: "data",
                         mutation: (evt) => this.playTrack(evt.datum.uri)
                       })
                     }
                   }
                 ]}
                  />
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
