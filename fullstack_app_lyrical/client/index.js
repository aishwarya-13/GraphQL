/**
 * 
Apollo Provider: Integration layer between the Apollo store and our actual React app.
Provider will take the data from the store and inject it into our React app

Apollo Client: Interacts with GraphQL server on the backend. It is making the request and storing that data locally when the response comes back.
 */

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/songs-list";
import App from "./components/App";
import SongCreate from "./components/song-create";
import "./style/style.css";
import SongDetail from "./components/song-detail";

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path={"/"} component={App}>
          <IndexRoute component={SongList} />
          <Route path={"/songs/create"} component={SongCreate} />
          <Route path={"/songs/:id"} component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
