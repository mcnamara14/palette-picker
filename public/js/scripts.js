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
    const createProjectInput = document.querySelector('.createProjectInput').value;
    const projects = document.querySelector('.projects');
    const project = document.createElement("article");
    project.className = "project";
    const title = document.createElement("h3");
    title.innerHTML = createProjectInput;
    project.prepend(title);
    projects.prepend(project)
}

const createProjectBtn = document.querySelector('.createProjectBtn');
createProjectBtn.addEventListener('click', () => addProjectTitle())

