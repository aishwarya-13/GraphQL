# GraphQL

1. Install libraries
2. Create a schema

express will handle the incoming requests and send responses.

express-graphql package
It is a compatibility layer between express and GraphQL.
It makes Express and GraphQL work with each other.

graphql library which helps to actually crawl through our data.

# JSON server??

-> The purpose of json-server is to mock a separate data source.
-> In real world, the application fetches data from multiple servers so here we will mock that scenario using a json-server.
-> json-server is hosted inside the same project directory but will be a separate running process from our graphql server.

1. Create a db.json file
2. Add a script in package.json file
   "scripts": {
   "json:server": "json-server --watch db.json"
   }
3. Run json server on another terminal using command "npm run json:server" -> JSON server runs on another port
