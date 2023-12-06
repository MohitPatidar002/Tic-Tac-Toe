const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const game = document.querySelector('.tic-tac-toe');
const Gif = document.querySelector('.crackerGif');
const gameTie = document.querySelector('.game-tie');


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//lets intialize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove('win');
        box.style.pointerEvents = "all";
    })
    Gif.classList.remove('active');
    game.classList.remove('active');
    newGameBtn.classList.remove('active');
    gameTie.classList.remove('active');
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach((position) => {
       
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            
            //we get the answer
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else{
                answer = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    // anwer milne ke bad ki katha
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        game.classList.add('active');
        Gif.classList.add('active');
        newGameBtn.classList.add('active');
        return;
    }
    newGameBtn.addEventListener('click', initGame);

    // agar answer nhi mila then
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount === 9){
        gameInfo.innerText = 'Game Tied !';
        game.classList.add('active');
        gameTie.classList.add('active');
        newGameBtn.classList.add('active');
    }

}

// which box was clicked
function handleClick(index) {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";

    //call the swapTurn function
    swapTurn();

    // check the winner found
    checkGameOver();
}

boxes.forEach((box,index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})
