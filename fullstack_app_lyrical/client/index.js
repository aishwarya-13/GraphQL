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

/**
 * When Apollo fetches data it has no idea of what piece of data is what.
 * So we have to help Apollo understand which piece of data is which. This tells
 * React when certain piece of data updates.
 * The id returned here is used by Apollo to identify records inside the Apollo store.
 * Here in LyricCreate component when we add lyric, we need the lyric list to be updated.
 * So instead of refetching the query, we added an id config below.
 * So what happens is when a new lyric is added, Apollo tells React that some properties of
 * this particular song ID just changed and you need to re-render the component
 */
const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
});

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
