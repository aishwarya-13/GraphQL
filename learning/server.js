const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schemas/schema");

const app = express();

/** If a request comes with /graphql in the url then route it through GraphQL 
 "graphiql" is a an in browser IDE meant for exporing GraphQL.
*/
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log(`Server listening`);
});
