import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

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
      </div>
    );
  }
}

export default graphql(query)(SongsList);

/**
 * data object is provided by the GraphQL library
 */
