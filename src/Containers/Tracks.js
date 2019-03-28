import React, {Component} from 'react'
import {connect} from "react-redux"
import {getTracks} from ".././Actions/TrackActions"
import {getTrackRecs} from ".././Actions/RecommendationActions"
import {radioOff, clearQueue} from ".././Actions/RadioActions"
import {playTrack} from ".././Helpers/SpotifyAPI"
import {Grid, Button, Header, Loader, Icon} from "semantic-ui-react"
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

  updateLibrary = () => {
     fetch(`${process.env.REACT_APP_BASEURL}/api/v1/update_library`, {
         headers: {
           "Authorization": localStorage.getItem("jwt")
         }
       })
       .then(() => this.props.getTracks())
       .then(() => this.props.getTrackRecs())
       .then(() => this.mapTracks(this.props.tracks.tracks))
     }

     playTrackAndClearRadio = (uri) => {
       this.props.radioOff()
       this.props.clearQueue()
       playTrack(uri)
     }

  render() {
    return (
      <React.Fragment>
        <Grid columns={2}>
              <Grid.Column>
                <Header as='h2' textAlign='center'>
                  My Top Tracks
                </Header>
                <Button animated='fade' onClick={this.updateLibrary} color="blue">
                  <Button.Content visible>
                    <Icon name="spotify" size="large"/>
                  </Button.Content>
                  <Button.Content hidden>Update Library</Button.Content>
                </Button>
                {this.state.mappedTracks.length === 0 ?
                  <Loader active size="huge" inline='centered'>Loading Tracks</Loader> : null}
                <VictoryScatter
                animate={{ duration: 150 }}
                width={900}
                height={600}
                padding={ {top: 100, bottom: 150, left: 100, right: 100} }
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    labels={(datum) => `${datum.name}, Popularity: ${datum.popularity}`}
                  />
                }
                style={{
                  data: { fill: "#fa4659" },
                  labels: {fontSize: 15.5, fill: "white"},
                }
                }
                bubbleProperty="popularity"
                maxBubbleSize={30}
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
                       mutation: (evt) => this.playTrackAndClearRadio(evt.datum.uri)
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
                  <Button animated='fade' onClick={this.props.getTrackRecs} color="blue">
                    <Button.Content visible>
                      <Icon name="spotify" size="large"/>
                    </Button.Content>
                    <Button.Content hidden >Update Recommendations</Button.Content>
                  </Button>
                  <VictoryScatter
                  animate={{ duration: 150 }}
                  width={900}
                  height={600}
                  containerComponent={<VictoryZoomVoronoiContainer
                    labels={(d) => `${d.artist_name} - ${d.name}`}
                  />}
                  padding={ {top: 100, bottom: 150, left: 100, right: 100} }
                  style={{
                    data: { fill: "#11cbd7" },
                    labels: {fontSize: 15.5, fill: "white"}
                  }
                  }
                  bubbleProperty="popularity"
                  maxBubbleSize={27.5}
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
                         mutation: (evt) => this.playTrackAndClearRadio(evt.datum.uri)
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
    getTrackRecs,
    radioOff,
    clearQueue
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracks)
