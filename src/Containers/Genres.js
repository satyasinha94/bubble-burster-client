import React, {Component} from 'react'
import {connect} from "react-redux"
import {getGenreRecs} from ".././Actions/RecommendationActions"
import {radioOff, clearQueue} from ".././Actions/RadioActions"
import {playTrack} from ".././Helpers/SpotifyAPI"
import {Grid, Header, Button, Loader, Icon} from 'semantic-ui-react'
import {VictoryScatter, VictoryLabel, createContainer } from 'victory'
const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
class Genres extends Component {

  constructor(props) {
  super(props);
  this.checkForGenreRecsInterval = null;
}

  componentDidMount(){
    console.log("genres")
    this.checkForGenreRecsInterval = setInterval(() => this.checkForGenreRecs(), 1000)
  }

  checkForGenreRecs = () => {
    if (this.props.genre_recommendations.length === 0) {
      this.props.getGenreRecs()
    }
    else {
      clearInterval(this.checkForGenreRecs)
    }
  }

  componentWillUnmount() {
    clearInterval(this.checkForGenreRecsInterval)
  }

  playTrackAndClearRadio = (uri) => {
    this.props.radioOff()
    this.props.clearQueue()
    playTrack(uri)
  }


  render() {
    return (
      <Grid columns={1} >
        <Grid.Column className="genre">
          <Header as='h2' textAlign='center'>
            Genre Recommendations
          </Header>
          <Button animated='fade' onClick={this.props.getGenreRecs} color="blue">
            <Button.Content visible>
              <Icon name="spotify" size="large"/>
            </Button.Content>
            <Button.Content hidden>Update Recommendations</Button.Content>
          </Button>
          {this.props.genre_recommendations.length === 0 ?
            <Loader active size="huge" inline='centered'>Loading Tracks</Loader> : null}
          <VictoryScatter
          padding={100}
          animate={{ duration: 150 }}
          width={1000}
          height={800}
          containerComponent={<VictoryZoomVoronoiContainer
            labels={(d) => `${d.artist_name} - ${d.name}`}
            style={{
              labels: {fontSize: 20}
            }}
          />}
          style={{
            data: { fill: "#11cbd7" },
            labels: {fontSize: 20, fill: "white"},
          }
          }
          bubbleProperty="popularity"
          maxBubbleSize={30}
          minBubbleSize={10}
          data={this.props.genre_recommendations.map((track, index) => {
            return {x: index + 75 , y:Math.random(0,100), uri: track.attributes.uri, popularity: track.attributes.popularity, name: track.attributes.name, artist_name: track.attributes["artist-name"]}})
          }
          labels={this.props.genre_recommendations.map(track => `${track.attributes["artist-name"]} - ${track.attributes.name}`)}
          labelComponent={<VictoryLabel dy={-20}/>}
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
      )
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.auth.player,
    genre_recommendations: state.recs.genre_recommendations
    }
}

const mapDispatchToProps = {
    getGenreRecs,
    radioOff,
    clearQueue
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres)
