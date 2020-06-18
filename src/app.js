const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");
const { Route } = require("express");

const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

class Repo {
  constructor(title, url, techs) {
    this.id = uuid(),
    this.title = title,
    this.url = url,
    this.techs = techs,
    this.likes = 0
  };

  newLike() {
    this.likes += 1;
    return this.likes;
  };

};

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepo = new Repo(title, url, techs);
  repositories.push(newRepo);
  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  // check if ID is valid
  const { id } = request.params;
  if (!isUuid(id)){
    return response.status(400).json(`error: uuid ${id} is invalid`);
  };

  // check if our repo contain this valid ID
  const repoIndex = repositories.findIndex( repo => repo.id === id );
  if (repoIndex < 0) {
    return response.status(400).json(`error: uuid ${id} is not found`);

  // update the repository with this ID
  } else {
    const { title, url, techs } = request.body;
    
    title ? repositories[repoIndex].title = title : '';
    url ? repositories[repoIndex].url = url : '';
    techs ? repositories[repoIndex].techs = techs : '';        
    
    return response.json(repositories[repoIndex])
  }
});

app.delete("/repositories/:id", (request, response) => {
  // check if ID is valid
  const { id } = request.params;
  if (!isUuid(id)){
    return response.status(400).json(`error: uuid ${id} is invalid`);
  };

  // check if our repo contain this valid ID
  const repoIndex = repositories.findIndex( repo => repo.id === id );
  if (repoIndex < 0) {
    return response.status(400).json(`error: uuid ${id} is not found`);

  // delete the repository with this ID
  } else {
    repositories.splice((repoIndex), 1);
    return response.status(204).json('');
  }
});

app.post("/repositories/:id/like", (request, response) => {
  // check if ID is valid
  const { id } = request.params;
  if (!isUuid(id)){
    return response.status(400).json(`error: uuid ${id} is invalid`);
  };

  // check if our repo contain this valid ID
  const repoIndex = repositories.findIndex( repo => repo.id === id );
  if (repoIndex < 0) {
    return response.status(400).json(`error: uuid ${id} is not found`);

  // update the repository with this ID
  } else {
    const likes = repositories[repoIndex].newLike();
    return response.json(repositories[repoIndex]);
  }
});

module.exports = app;
