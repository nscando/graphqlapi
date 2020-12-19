'use stric'
const { buildSchema, graphql } = require('graphql');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const port = process.env.PORT || 3000;


//schema
const schema = buildSchema(`
type Query{
     hello: String
     
}
`)

//resolvers config

const resolvers = {
  hello: () => {
    return 'hello world!'
  },

}


app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
})