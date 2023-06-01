import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";

class SongsList extends Component {
  deleteSong(id) {
    //console.log(id);
    this.props
      .mutate({
        variables: {
          id,
        },
      })
      .then(() => this.props.data.refetch()); //we can use "refetchQueries" here as well
  }

  renderSongs() {
    // console.log(this.props);
    return (
      this.props.data.songs &&
      this.props.data.songs.map((song, index) => {
        return (
          <li key={`songs-${song.id}`} className={"collection-item"}>
            <Link to={`/songs/${song.id}`}>{song.title}</Link>
            <i
              className="material-icons"
              onClick={() => {
                this.deleteSong(song.id);
              }}
            >
              delete
            </i>
          </li>
        );
      })
    );
  }

  render() {
    // console.log(this.props);
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

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongsList));

// export default graphql(fetchSongs)(SongsList);

/**
 * data object is provided by the GraphQL library
 */
