import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.createSong = this.createSong.bind(this);
  }

  handleChange(e) {
    this.setState({
      title: e.target.value,
    });
  }

  createSong(e) {
    e.preventDefault();
    //Call a mutation and sending dynamic data to the mutation
    this.props.mutate({
      variables: {
        title: this.state.title,
      },
    });
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <h3>Create a new song</h3>
        <form onSubmit={this.createSong}>
          <label>Song Title:</label>
          <input
            type={"text"}
            value={this.state.title}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(SongCreate);
