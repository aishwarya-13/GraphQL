const graphql = require("graphql");
const _ = require("lodash");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

/**
 * Here we have circular reference between UserType and CompanyType (User depends on Company and Company depends on User)
 * So to solve this issue wrap the fields object in arrow function.
 * So here the arrow function returns the object containing id, name, description, users.
 * So this function will not be executed until the entire file has been executed
 * The UserType is now inside of the closure scope of this arrow function
 */

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType), //since we will get list of users we use GraphQLList type
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((res) => res.data);
      },
    },
  }),
});

/**
 * GraphQLObjectType instructs the presence of the user in our application.
 * We create a User type which represents a user and we define user's properties
 * We need resolve function here to fetch the company id of a particular company
 * ^^ parentValue gives the instance of company
 */
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        console.log(parentValue, args);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`) //parentValue gives the instance of company
          .then((response) => response.data);
      },
    },
  }),
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
        console.log(args.id);
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then((response) => response.data);
      },
    },
    company: {
      type: CompanyType,
      //(args object tells our schema that whenever someone tries to access this field, we expect them to be providing
      //this ID argument and ID should be provided as a string)
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then((resp) => {
            console.log(resp);
            return resp.data;
          });
      },
    },
  },
});

/**
 * GraphQLNonNull - puts validation on arguments.
 * For ex: firstName cannot be null
 */
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType, //return type of data.The type of data resolve() function will return
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        companyId: {
          type: GraphQLString,
        },
      }, //arguments to be passed into the resolve function
      resolve(parentValue, args) {
        console.log(args);
        return axios
          .post(`http://localhost:3000/users`, {
            firstName: args.firstName,
            age: args.age,
          })
          .then((res) => {
            console.log("res", res);
            return res.data;
          });
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/users/${args.id}`)
          .then((res) => res.data);
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstName: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/users/${args.id}`, args)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

/**
 * Queries example
 * 
 * Nested Queries
 * 
query {
  company(id:"2"){
    name
    description
    users{
      firstName
    }
  }
}

query getCompany {
  company(id:"2"){
    name
    description
    users{
      firstName
      company{
        name
      }
    }
  }
}

====

{
  company(id: "1") {
    id,
    name,
    description
  }
}


{
  company(id:"1"){
    name
  }
}

====
Calling mutations

mutation{
  addUser(firstName: "Stephen", age: 26){
    id,//return id
    age//age will be returned
  }
}

mutation{
  deleteUser(id: "1"){
    id,
    firstName
  }
}

mutation{
  updateUser(id:"3", age: 30){
    id,
    firstName
  }
}
 */
