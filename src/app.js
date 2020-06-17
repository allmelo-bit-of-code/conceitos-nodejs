const express = require("express");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

class Repo {
  constructor(title, url, techs) {
    this.title = title,
    this.url = url,
    this.techs = techs,
    this.id = uuid(),
    this.likes = 0
  };

  like() {
    this.like += 1;
  };

};

function idStatusOnRepo(reqParam){
  const { id } = reqParam;

  if (!isUuid(id)){
    return response.status(400).json(`error: uuid ${id} is invalid`)
  }; 
  
  const paramIndex = repositories.findIndex( repo => repo.id === id );
  
  if (repoIndex < 0) {
    return response.status(400).json(notFound(`error: uuid ${id} is not found`))
  } else {
    return paramIndex
  }
};

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
