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
    const article = document.createElement("article");
    article.className = "project";
    const title = document.createElement("h3");
    title.innerHTML = project.name;
    article.prepend(title);
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
    console.log(data)
    
}

document.querySelector('.save-palette-btn').addEventListener('click', addPalette)


