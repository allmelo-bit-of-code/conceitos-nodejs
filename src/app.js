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
    response.status(400).json(`error: uuid ${id} is invalid`);
    return false;
  };

  const repoIndex = repositories.findIndex( repo => repo.id === id );

  if (repoIndex < 0) {
    response.status(400).json(notFound(`error: uuid ${id} is not found`))
    return false;
  } else {
    return repoIndex;
  }
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
  const repoIndex = idStatusOnRepo(request.params);

  if (!repoIndex){
    return console.error('not alowed');

  } else {
    const { title, url, techs } = request.body;
    
    title ? repositories[repoIndex].title = title : '';
    url ? repositories[repoIndex].url = url : '';
    techs ? repositories[repoIndex].techs = techs : '';        
    
    return response.json(repositories[repoIndex])
  }
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
