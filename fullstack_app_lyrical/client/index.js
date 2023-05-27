/**
 * 
Apollo Provider: Integration layer between the Apollo store and our actual React app.
Provider will take the data from the store and inject it into our React app

Apollo Client: Interacts with GraphQL server on the backend. It is making the request and storing that data locally when the response comes back.
 */

import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>{`Lyrical`}</div>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
