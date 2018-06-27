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

const createProjectBtn = document.querySelector('.createProjectBtn');
createProjectBtn.addEventListener('click', () => addProjectTitle())

