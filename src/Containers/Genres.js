import React, {Component} from 'react'
import {connect} from "react-redux"
import {getGenres} from ".././Actions/GenreActions"
import {getAllRecs} from ".././Actions/RecommendationActions"
import { VictoryGroup, VictoryScatter, VictoryLegend, VictoryLabel, VictoryZoomContainer, VictoryTooltip } from 'victory'
class Genres extends Component {

  componentDidMount(){
    console.log("genres")
    this.props.getGenres()
    this.props.getAllRecs()
  }

  render() {
    return (
      <VictoryGroup
        containerComponent={<VictoryZoomContainer zoomDomain={{ x: [0, 75], y: [0, 75] }} />}
      >
        <VictoryScatter />
      </VictoryGroup>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
    recommendations: state.recs.recommendations
    }
}

const mapDispatchToProps = {
    getGenres,
    getAllRecs
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres)
