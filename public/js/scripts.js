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

const generateBtn = document.querySelector('.generate-btn');
generateBtn.addEventListener('click', changeColors);

const lockColor = (e) => {
    const lock = e.target;
    const colorContainer = e.target.closest('article');
    const color = colorContainer.querySelector('.color');

    color.classList.toggle('locked');
    if (lock.classList.contains('fa-lock')) {
        lock.classList = 'fas fa-unlock-alt lock';
    } else {
        lock.classList = 'fas fa-lock lock'; 
    }
}

const lockBtn = document.querySelectorAll('.lock');
lockBtn.forEach(lock => {
    lock.addEventListener('click', (e) => lockColor(e))
});
