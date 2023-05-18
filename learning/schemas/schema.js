const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

/**
 * GraphQLObjectType instructs the presence of the user in our application.
 * We create a User type which represents a user and we define user's properties
 * We need resolve function here to fetch the company id of a particular company
 */
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        console.log(parentValue, args);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((response) => response.data);
      },
    },
  },
});

/**
 * Root Query is the entry point of your application. It allowsgraph to enter into our applications data graph
 * Purpose: Allow GraphQLto jump and land on a very specific node in the graph of all of our data.
 * So if anyone comes into our app asking for a particular use, then they are probably asking about the UserType just created.
 * ^args is arguments. It specifies arguments that are required for this root query of a given user.
 * ^resolve function is where we actually go into our DB and look for data we are looking for
 * args param in resolve function gets called with whatever arguments were passed into the original query.
 */
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        //Fecthing data from another server (here we mock other server using json server)
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((response) => response.data);
      },
    },
  },
});

//

module.exports = new GraphQLSchema({ query: RootQuery });
