import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleSubmit(event) {
    let songId = this.props.params;
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: "" }));
  }

  render() {
    //console.log("we", this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Add a lyric</label>
        <input value={this.state.content} onChange={this.handleChange} />
      </form>
    );
  }
}

/**
 * You need to fetch id of lyric added so that Apollo knows that updates are happened and it can tell React to render the component
 */

const mutation = gql`
  mutation AddLyricToSong($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
