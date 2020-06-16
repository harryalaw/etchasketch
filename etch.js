function initialise(pixels) {
    let canvas = document.querySelector('.canvas');
    for (let i = 0; i < pixels; i++) {
        for (let j = 0; j < pixels; j++) {
            let cell = document.createElement(`div`);
            cell.classList.add('pixel');
            cell.textContent = `${i},${j}`;
            canvas.appendChild(cell);
        }
    }
}
//problems come from inputs from prompt being strings!
let userInput;
do {
    userInput = parseInt(prompt('What size grid do you want?'));
} while (!(Number.isInteger(userInput)) || userInput <= 0)

//this isn't really happy with what's going on here;
//doesn't properly send the repeat through;
//could be to do with the fact that it's taking a variable and not a fixed value
function updateGrid(userInput){
    const repeatVal =userInput;
    document.querySelector('.canvas').style.gridTemplateColumns = 'repeat(repeatVal, 1fr)';
    document.querySelector('.canvas').style.gridTemplateRows = 'repeat(repeatVal,1fr)';
}


initialise(userInput);
updateGrid(userInput);

function updateColumns(){
    document.querySelector('.canvas').style.gridTemplateColumns = "200px 200px";
}