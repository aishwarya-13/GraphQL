import React, { Component } from "react";
import { graphql } from "react-apollo";
import fecthSongDetails from "../queries/song-detail";
import { Link } from "react-router";
import LyricCreate from "./lyric-create";

class SongDetail extends Component {
  render() {
    console.log(this.props);
    console.log(this.props.params);

    const { song } = this.props.data;

    if (!song) {
      return <span>Loading...</span>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricCreate />
      </div>
    );
  }
}

//How to pass id from component to the query
export default graphql(fecthSongDetails, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id,
      },
    };
  },
})(SongDetail);
