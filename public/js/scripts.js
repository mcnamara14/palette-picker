const retrieveAllData = async () => {
    const projects = await retrieveAllProjects();
    const palettes = await retrieveAllPalettes();
    if (projects.length) {
        projects.forEach(project => {
            prependProject(project);
            addProjectToDropdown(project);
        })
    }
    if (palettes.length) {
        palettes.forEach(palette => {
            displayPalette(palette)
        })
    }
}

const retrieveAllProjects = async () => {
    const response = await fetch('/api/v1/projects/')
    const projects = await response.json();

    return projects;
}

const retrieveAllPalettes = async () => {
    const response = await fetch('/api/v1/palettes/')
    const palettes = await response.json();

    return palettes;
}

retrieveAllData();

const changeColors = () => {
    for (var i = 1; i < 6; i++) {
        const color = document.querySelector(`.color-${i}`);
        if (!color.classList.contains('locked')) {
            const hex = document.querySelector(`.hex-${i}`);
            const randomColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            color.style.background = randomColor;
            hex.innerHTML = randomColor;
        }
    }
}

changeColors();

const generateBtn = document.querySelector('.generate-btn');
generateBtn.addEventListener('click', changeColors);

const lockColor = (e) => {
    const lock = e.target;
    const colorContainer = e.target.closest('article');
    const color = colorContainer.querySelector('.color');

    color.classList.toggle('locked');
    if (lock.classList.contains('fa-lock')) {
        lock.classList = 'fas fa-lock-open lock';
    } else {
        lock.classList = 'fas fa-lock lock'; 
    }
}

const lockBtn = document.querySelectorAll('.lock');
lockBtn.forEach(lock => {
    lock.addEventListener('click', (e) => lockColor(e))
});

const addProjectTitle = () => {
    const projectName = document.querySelector('.createProjectInput').value;
 
    addProjectToDatabase(projectName);
    getProjectBtns();
}

const addProjectToDatabase = async (name) => {
    const response = await fetch('/api/v1/projects',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name })
    });
    const data = await response.json();
    const projectId = data.id;

    retrieveProjectFromDatabase(projectId);
}

const retrieveProjectFromDatabase = async (id) => {
  const response = await fetch(`/api/v1/projects/${id}`);
  const data = await response.json();
  const project = data[0];
  
  prependProject(project);
  addProjectToDropdown(project);
}

const prependProject = (project) => {
    const projects = document.querySelector('.projects');
    const article = document.createElement('article');
    const div = document.createElement('div');
    article.className = `project project${project.id}`;
    article.id = project.id;
    const title = document.createElement('h3');
    const button = document.createElement('BUTTON');
    const buttonText = document.createTextNode('X');
    button.appendChild(buttonText);
    title.innerHTML = project.name;
    article.prepend(div);
    div.prepend(title);
    div.prepend(button);
    projects.prepend(article);
}

const addProjectToDropdown = (project) => {
  const paletteDropdown = document.querySelector('.palette-dropdown');
  const option = document.createElement('option');
  option.value = project.id;
  option.innerHTML = project.name;

  paletteDropdown.appendChild(option);
}

const createProjectBtn = document.querySelector('.createProjectBtn');
createProjectBtn.addEventListener('click', () => addProjectTitle())

document.querySelector('.palette-dropdown').addEventListener('change', function(){
    const selected = this.options[this.selectedIndex]
    selected.className = "project-option selected-project"
});

const addPalette = () => {
    const paletteName = document.querySelector('.palette-name').value;
    const colors = getColors();
    const projectId = getProjectId();
    
    addPaletteTodatabase(paletteName, colors, projectId);
    getPaletteBtns();
}

const getColors = () => {
    const colorNodes = document.querySelectorAll('.hex span');
    const allColors = [...colorNodes]
    const colors = allColors.map(color => {
        return colorValue = color.innerHTML;
    });

    return colors;
}

const getProjectId = () => {
    let projectId;

    const optionNodes = document.querySelectorAll('option');
    const allOptions = [...optionNodes]
    allOptions.forEach(option => {
        if (option.classList.contains('selected-project')) {
            projectId = option.value;
        }
    });

    return projectId;
}

const addPaletteTodatabase = async (name, colors, projectId) => {
    const response = await fetch(`/api/v1/${projectId}/palettes`,
    {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            name, 
            color1: colors[0], 
            color2: colors[1], 
            color3: colors[2], 
            color4: colors[3], 
            color5: colors[4]  
        })
      });
    const data = await response.json();
    const paletteId = data.id;

    retrievePaletteFromDatabase(paletteId);
}

const retrievePaletteFromDatabase = async (paletteId) => {
    const response = await fetch(`/api/v1/palettes/${paletteId}`)
    const data = await response.json();
    const palette = data[0];
    
    displayPalette(palette);
}

const displayPalette = (palette) => {
    const projectArticle = document.querySelector(`.project${palette.project_id}`)
    const button = document.createElement("BUTTON");
    const buttonText = document.createTextNode("X");
    button.appendChild(buttonText);
    const paletteArticle = document.createElement('article');
    paletteArticle.className = `palette palette${palette.id}`;
    paletteArticle.id = palette.id;
    const title = document.createElement('h4');
    title.innerHTML = palette.name;
    const colorContainer = document.createElement('section');
    colorContainer.className = 'project-palette-colors';
    const color1 = document.createElement('div');
    color1.className = 'project-palette-color';
    color1.style.backgroundColor = palette.color1;
    const color2 = document.createElement('div');
    color2.className = 'project-palette-color';
    color2.style.backgroundColor = palette.color2;
    const color3 = document.createElement('div');
    color3.className = 'project-palette-color';
    color3.style.backgroundColor = palette.color3;
    const color4 = document.createElement('div');
    color4.className = 'project-palette-color';
    color4.style.backgroundColor = palette.color4;
    const color5 = document.createElement('div');
    color5.className = 'project-palette-color';
    color5.style.backgroundColor = palette.color5;
    paletteArticle.prepend(title);
    paletteArticle.append(colorContainer);
    colorContainer.append(color1, color2, color3, color4, color5);
    paletteArticle.append(button);
    projectArticle.append(paletteArticle);
}

document.querySelector('.save-palette-btn').addEventListener('click', addPalette);


const changePaletteName = () => {
    const paletteName = document.querySelector('.palette-name').value;
    const paletteHeading = document.querySelector('.palette-heading');
    paletteHeading.innerHTML = paletteName;
}

document.querySelector('.palette-name').addEventListener('input', changePaletteName);

const deleteProject = async (e) => {

    const button = e.target;
    const project = button.closest('.project');
    const id = project.getAttribute('id')

    const response = await fetch(`/api/v1/projects/${id}`, {method: 'DELETE'});
    project.remove();
}

const getProjectBtns = () => {
    setTimeout(function() { 
        deleteProjectBtns = document.querySelectorAll('.project button');
        deleteProjectBtns.forEach(button => {
            button.addEventListener('click', (e) => deleteProject(e))
        });
    }, 500);
}


const deletePalette = async (e) => {
    const button = e.target;
    const palette = button.closest('.palette');
    const id = palette.getAttribute('id')
    
    const response = await fetch(`/api/v1/palettes/${id}`, {method: 'DELETE'});
    palette.remove();
}

const getPaletteBtns = () => {
    setTimeout(function() { 
        deletePaletteBtns = document.querySelectorAll('.palette button');
        deletePaletteBtns.forEach(button => {
            button.addEventListener('click', (e) => deletePalette(e))
        });
    }, 500);
}

getPaletteBtns();
getProjectBtns();