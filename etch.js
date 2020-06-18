//global variables
let randEach = false;
let debuggingHelper;


function initialise(userInput) {

    let canvas = document.querySelector('.canvas');
    for (let i = 0; i < userInput; i++) {
        for (let j = 0; j < userInput; j++) {
            let cell = document.createElement(`div`);
            cell.classList.add('pixel');
            // cell.textContent = `${i},${j}`;
            canvas.appendChild(cell);
        }
    }
    let root = document.documentElement;
    let percentage = 100 / userInput;
    percentage += "%"
    root.style.setProperty('--gridSize', userInput);
    root.style.setProperty('--pixelSize', percentage);
    const cells = document.querySelectorAll('.pixel');
    cells.forEach(cell => cell.addEventListener('mouseover', colorCell))
}
//problems come from inputs from prompt being strings!
function userSize() {
    do {
        userInput = parseInt(prompt('What size grid do you want?'));
        if (!userInput) return 16;
    } while (!(Number.isInteger(userInput)) || userInput <= 0)
    return userInput;
}


//removes color from each cell
const clearGrid = () => {
    const cells = document.querySelectorAll('.pixel');
    cells.forEach(cell => cell.style.backgroundColor = ``);
    cells.forEach(cell => cell.removeAttribute("id"));
    cells.forEach(cell => cell.classList.remove("randomColor"));
}

//colors a cell based on --pixelColor css variable
function colorCell(e) {
    let root = document.documentElement;
    let color = getComputedStyle(root).getPropertyValue('--pixelColor')
    if (!randEach) {
        e.target.classList.remove("randomColor");
        e.target.removeAttribute("id");
        e.target.style.backgroundColor = color;
    }
    else {
        //check if a cell has already been colored randomly
        //if not assign it a random color and generate the next one
        if (!e.target.classList.contains("randomColor")) {
            e.target.classList.add('randomColor')
            e.target.id = `${color}`;
            e.target.style.backgroundColor = color;
            color = changeColor(randomColor());
        }
        //if it has been assigned we make it darker by changing the
        //lightness of the hsl code

        else {
            let hslCode = e.target.id;
            let hslArray = hslCode.split(',');
            let lightness = Math.floor(Number(hslArray[2].slice(0, -2)) * 0.9);
            if (lightness < 3) lightness = 0;
            hslArray[2] = `${lightness}%)`;
            color = hslArray.join(',');
            e.target.id = `${color}`;
            e.target.style.backgroundColor = color;
        }
    }
}

//deletes the current pixels
function resetGrid() {
    const canvas = document.querySelector('.canvas')
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild)
    }
}
//deletes current grid and recreates a new one
const refreshGrid = e => {
    resetGrid();
    userInput = userSize();
    initialise(userInput);
}
//changes the css --pixelColor to chosen color
const changeColor = (color) => {
    if (color == "Random" || color == "Random Everytime") {
        color = randomColor();
        document.documentElement.style.setProperty('--randomColor', color);
    }

    document.documentElement.style.setProperty('--pixelColor', color);
}
//changes color based on the  button pressed
const changeColorClick = e => {
    let root = document.documentElement;
    let color = e.target.value;
    changeColor(color);
    console.log(color);
}

//generates a random hsl color
const randomColor = () => {
    let h = randInt(360);
    let s = `${randInt(100)}%`;
    let l = `${randInt(100)}%`;
    return `hsl(${h},${s},${l})`;
}

//randomInteger Function
const randInt = (n) => Math.floor(Math.random() * n);

//initial setup of grid;
let userInput;
initialise(16);

//enlarges currently selected color
const grow = (e) => {
    colorButton.forEach(button => button.classList.remove('grow'));
    e.target.classList.add('grow');
}
//enables random everytime
const randomFactor = (e) => {
    if (e.target.id == "randomEach") {
        randEach = true;
    }
    else { randEach = false };
}

//event listeners
const button = document.getElementById('resize');
button.addEventListener('click', refreshGrid);

let buttonClear = document.getElementById('clear')
buttonClear.addEventListener('click', clearGrid);

const colorButton = document.getElementsByName('color');
colorButton.forEach(button => button.addEventListener('click', changeColorClick));
colorButton.forEach(button => button.addEventListener('click', grow));
colorButton.forEach(button => button.addEventListener('click', randomFactor));
