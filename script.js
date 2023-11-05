const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


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

function initGame(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    // you have to make empty on UI also after calling in it by new game btn
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // reset all css properties after win or tie
        box.classList = ` box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
        if(((gameGrid[position[0]] !== "") && (gameGrid[position[1]]!== "") && (gameGrid[position[2]] !== "")) 
        && ((gameGrid[position[0]]) === (gameGrid[position[1]])) && ((gameGrid[position[1]])=== (gameGrid[position[2]])) ){
            if(gameGrid[position[0]] === 'X'){
                answer = 'X';
            }
            else{
                answer = 'O';
            }
        
            // disable pointer after getting winner
            boxes.forEach((box)=>{
            box.style.pointerEvents = "none";
            })
            // mark green background after getting winner
            if(answer !== ""){
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                }
        
        }
    });
    // after getting winner 

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // No winner found condition
    let fillcount = 0;
    gameGrid.forEach((box)=>{
        if(box!== ""){
            fillcount++;
        }
    });
    if(fillcount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
    
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handelClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //to remove cursor pointer or avoid rewriting
        boxes[index].style.pointerEvents = "none";
        //swaps the turn of players
        swapTurn();
        // checks weather ssome one wins or not at each click?
        checkGameOver();
    }
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",() => {
        handelClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
