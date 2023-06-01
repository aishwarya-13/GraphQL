import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import fetchSongs from "../queries/fetchSongs";

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
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongs }], //query to be fired after song is added. Here we call fetch all songs query
      })
      .then(() => hashHistory.push("/")) //here we cannot use this.props.data.refetch() because the query we wanna fire is completely different than the one associated with this component
      .catch((err) => console.log(err));
    //console.log(this.props);
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
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
