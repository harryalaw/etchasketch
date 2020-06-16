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
    cells.forEach(cell => cell.addEventListener('mouseover', colourCell))
}
//problems come from inputs from prompt being strings!
function userSize() {
    do {
        userInput = parseInt(prompt('What size grid do you want?'));
    } while (!(Number.isInteger(userInput)) || userInput <= 0)
    return userInput;
}


let userInput;
userInput = userSize();
initialise(userInput);



const button = document.getElementById('reset');
button.addEventListener('click', refreshGrid);

function colourCell(e) {
    e.target.style.backgroundColor = "black";
}


function resetGrid() {
    // cells.forEach(cell => cell.style.backgroundColor = "white");
    const canvas = document.querySelector('.canvas')
    while (canvas.firstChild) {
        canvas.removeChild(canvas.lastChild)
    }
}

function refreshGrid(e) {
    resetGrid();
    userInput = userSize();
    initialise(userInput);
}

// function updateColumns(){
//     document.querySelector('.canvas').style.gridTemplateColumns = "200px 200px";
// }

//I think the "pixels" are taking up a percentage of the div that they are in-not the divs taking a
//percentage of the column;