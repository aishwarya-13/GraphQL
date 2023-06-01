import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";

class SongsList extends Component {
  renderSongs() {
    console.log(this.props);
    return (
      this.props.data.songs &&
      this.props.data.songs.map((song, index) => {
        return (
          <li key={`songs-${index}`} className={"collection-item"}>
            {song.title}
          </li>
        );
      })
    );
  }

  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return <div>{`Loading...`}</div>;
    }
    return (
      <div>
        {"List of Songs"}
        <ul className="collection">{this.renderSongs()}</ul>
        <Link className="btn-floating btn-large red right" to={"songs/create"}>
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(fetchSongs)(SongsList);

/**
 * data object is provided by the GraphQL library
 */
