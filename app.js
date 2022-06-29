const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");
const { connectDb } = require("./db");

const app = express();
connectDb();

app.get("/", (req, res) => {
  res.send("Hola esta es mi api GRAPHQL");
});

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app});

  app.use((req, res, next) => {
    res.status(404).send("No encontraras nada aqui");
  });

  app.listen(process.env.PORT || 3000, () =>
    console.log("Servidor en puerto", process.env.PORT || 3000)
  );
}

start();