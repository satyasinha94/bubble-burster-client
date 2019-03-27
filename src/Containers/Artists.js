import React, {Component} from 'react'
import {connect} from "react-redux"
import {getArtists} from ".././Actions/ArtistActions"
import {getArtistRecs} from ".././Actions/RecommendationActions"
import {playTrack} from ".././Helpers/SpotifyAPI"
import {Grid, Header, Button, Loader, Icon} from "semantic-ui-react"
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

   updateLibrary = () => {
      fetch(`${process.env.REACT_APP_BASEURL}/api/v1/update_library`, {
  				headers: {
  					"Authorization": localStorage.getItem("jwt")
  				}
  			})
        .then(() => this.props.getArtists())
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
                <Button animated='fade' onClick={this.updateLibrary} color="blue">
                  <Button.Content visible>
                    <Icon name="spotify" size="large"/>
                  </Button.Content>
                  <Button.Content hidden>Update Library</Button.Content>
                </Button>
                {this.state.mappedArtists.length === 0 ?
                  <Loader active size="huge" inline='centered'>Loading Tracks</Loader> : null}
                <VictoryScatter
                animate={{ duration: 150 }}
                width={900}
                height={550}
                padding={ {top: 100, bottom: 150, left: 100, right: 100} }
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    labels={(d) => `${d.name}, Popularity: ${d.popularity}`}
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
                data={this.state.mappedArtists.map((artist, index) => {
                  return {x: index + 75 , y:Math.random(0,100), img: artist.attributes["img-url"], uri: artist.attributes.uri, popularity: artist.popularity, name: artist.attributes.name}})
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
                labelComponent={<VictoryLabel dy={-17.5} fixLabelOverlap={true}/>}
                  />
                  </Grid.Column>
                  <Grid.Column>
                  <Header as='h2' textAlign='center'>
                    My Recommendations
                  </Header>
                  <Button animated='fade' onClick={this.props.getArtistRecs} color="blue">
                    <Button.Content visible>
                      <Icon name="spotify" size="large"/>
                    </Button.Content>
                    <Button.Content hidden>Update Recommendations</Button.Content>
                  </Button>
                  <VictoryScatter
                  animate={{ duration: 150 }}
                  width={900}
                  height={550}
                  containerComponent={<VictoryZoomVoronoiContainer
                    labels={(d) => `${d.artist_name} - ${d.name}`}
                  />}
                  padding={ {top: 100, bottom: 150, left: 150, right: 150} }
                  style={{
                    data: { fill: "#11cbd7" },
                    labels: {fontSize: 15.5, fill: "white"},
                  }
                  }
                  bubbleProperty="popularity"
                  maxBubbleSize={27.5}
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
                         mutation: (evt) => playTrack(evt.datum.uri)
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
