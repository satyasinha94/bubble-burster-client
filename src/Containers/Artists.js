import React, {Component} from 'react'
import {connect} from "react-redux"
import {getArtists} from ".././Actions/ArtistActions"
import {getArtistRecs} from ".././Actions/RecommendationActions"
import {Grid, Header, Button} from "semantic-ui-react"
import {VictoryScatter, VictoryLabel, createContainer } from 'victory'
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
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

  playArtist = (uri) => {
    fetch("https://api.spotify.com/v1/me/player/play", {
     method: "PUT",
     headers: {
       authorization: `Bearer ${localStorage.getItem('access_token')}`,
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       "context_uri": `${uri}`
     })
   })
  }


  render(){
    return (
      <React.Fragment>
        <Grid columns={2}>
              <Grid.Column>
                <Header as='h2' textAlign='center'>
                  My Top Artists
                </Header>
                <VictoryScatter
                animate={{ duration: 200 }}
                width={600}
                height={600}
                padding={100}
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    labels={(d) => `${d.name}, Popularity: ${d.popularity}`}
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
                data={this.state.mappedArtists.map((artist, index) => {
                  return {x: index + 75 , y:Math.random(0,100), uri: artist.attributes.uri, popularity: artist.popularity, name: artist.attributes.name}})
                }
                events={[
                 {
                   target: "data",
                   eventHandlers: {
                     onClick: () => ({
                       target: "data",
                       mutation: (evt) => this.playArtist(evt.datum.uri)
                     })
                   }
                 }
               ]}
                labels={this.state.mappedArtists.map(artist => `${artist.attributes.name}
                  Popularity: ${artist.popularity}`)}
                labelComponent={<VictoryLabel dy={-17.5}/>}
                  />
                  </Grid.Column>
                  <Grid.Column>
                  <Header as='h2' textAlign='center'>
                    My Recommendations
                  </Header>
                  <Button onClick={this.props.getArtistRecs}>Update Recommendations</Button>
                  <VictoryScatter
                  animate={{ duration: 200 }}
                  width={600}
                  height={600}
                  containerComponent={<VictoryZoomVoronoiContainer
                    labels={(d) => `${d.artist_name} - ${d.name}`}
                  />}
                  padding={120}
                  style={{
                    data: { fill: "#11cbd7" },
                    labels: {fontSize: 12.5},
                  }
                  }
                  bubbleProperty="popularity"
                  maxBubbleSize={22}
                  minBubbleSize={3.5}
                  data={this.props.artist_recommendations.map((track, index) => {
                    return {x: index + 75 , y:Math.random(0,100), uri: track.attributes.uri, popularity: track.attributes.popularity, name: track.attributes.name, artist_name: track.attributes["artist-name"]}})
                  }
                  labels={this.props.artist_recommendations.map(track => `${track.attributes["artist-name"]} - ${track.attributes.name}`)}
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
