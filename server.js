const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

//Get all projects

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((project) => {
      response.status(200).json(project);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//Get all palettes

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palette) => {
      response.status(200).json(palette);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//Get one palette

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({ 
          error: `Could not find palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(404).json({ error });
    });
});

//Get one project

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(project => {
      if (project) {
        response.status(200).json(project);
      } else {
        response.status(404).json({ 
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//Add a project

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: "Expected name to be passed into the body" });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
}); 

//Add a palette to a project

app.post('/api/v1/:project_id/palettes', (request, response) => {
  const { project_id } = request.params;
  const { name, color1, color2, color3, color4, color5 } = request.body;
  const palette = { name, color1, color2, color3, color4, color5, project_id };

  for (let requiredParameter of ['name', 'color1', 'color2', 'color3', 'color4', 'color5']) {
    if (!request.body[requiredParameter]) {
      return response
        .status(422)
        .send({ error: "Expected name & colors to be passed into the body" });
    }
  }

  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error: `No project with an id of ${project_id}.` });
    });
}); 

//Delete a palette

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;

  database('palettes').where('id', id).del()
    .then(palette => {

      if (palette) {
        response.sendStatus(204)
      } else {
        response.status(404).json({ 
          error: `Could not find a palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//Delete a project

app.delete('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  console.log(id)
  database('projects').where('id', id).del()
    .then(project => {
      console.log(project)
      if (project) {
        return response.sendStatus(204);
      } else {
        return response.status(422).json({ error: 'Not Found' });
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

module.exports = app;