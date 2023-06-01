import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";

/**
 * optimisticResponse is used to optimize the pause we get when calling the query.
 * To remove the pause we use "optimisticResponse" and the object should be exactly like the one we get from the query
 * So here we are guessing what the response will be.
 * I case you guess the wrong answer that is not going to be a problem because Ui will update with the correct response after the query resolves
 */
class LyricList extends Component {
  constructor(props) {
    super(props);
  }

  onLike(id, likes) {
    console.log("onLike", id);
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    console.log("props", this.props);
    return (
      this.props.lyrics &&
      this.props.lyrics.map((lyric) => {
        console.log(lyric);
        return (
          <li key={`song-lyrics-${lyric.id}`} className="collection-item">
            {lyric.content}
            <div className="vote-box">
              <i
                className="material-icons"
                onClick={() => this.onLike(lyric.id, lyric.likes)}
              >
                thumb_up
              </i>
              {lyric.likes}
            </div>
          </li>
        );
      })
    );
  }

  render() {
    return (
      <div>
        <ul>{this.renderLyrics()}</ul>
      </div>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
