import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux"
import {getGenres} from ".././Actions/GenreActions"
class Genres extends Component {

  componentDidMount(){
    console.log("genres")
    this.props.getGenres()
  }

  render() {
    return (
      <div>Genres</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres
    }
}

const mapDispatchToProps = {
    getGenres
}

export default connect(mapStateToProps, mapDispatchToProps)(Genres)
