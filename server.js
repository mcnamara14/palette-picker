const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.projects = [
	{ id: '1', 
		name: 'Project 1'
  },
  { id: '2', 
  name: 'Project 2'
}
];

app.locals.palettes = [
  { id: '1', 
    name: 'Palette 1', 
    project_id: '1', 
    colors: [
        '#E37B40',
        '#46B29D',
        '#DE5B49',
        '#324D5C',
        '#F0CA4D'
    ]
  }
];

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
	const { projects } = app.locals;

	response.json(projects);
})

//Get all palettes

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palette) => {
      response.status(200).json(palette);
      console.log(JSON.parse(palette))
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//Add a project

app.post('/api/v1/projects', (request, response) => {
	const { name } = request.body;
	const { projects } = app.locals;
  const id = Date.now().toString();

	projects.push({ id, name }); 
})

//Add a palette to a project

app.post('/api/v1/:project_id/palettes', (request, response) => {
	const { project_id } = request.params;
	const { palettes } = app.locals;
	const id = Date.now().toString();
	const { name, colors } = request.body;

	palettes.push({ id, name, project_id, colors })
});

//Delete a project

app.delete('/api/v1/projects/:id', (request, response) => {
  let { projects } = app.locals;
  const { id } = request.params;
  const project = projects.find(project => project.id === id);

  project ? app.locals.projects = projects.filter(project => project.id !== id) : null;

  console.log(projects)
});

