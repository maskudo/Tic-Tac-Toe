const Player = (sign)=>{
    const getSign = ()=> {return sign}
    return {getSign}
}
const gameBoard = (()=>{
    let board = [
    '','','',
    '','','',
    '','','',
]

    function getBoard(){
        return board
    }
    function setValue(index,sign){
        if(board[index]==''){
            board[index]=sign
            displayController.updateDisplay(board)
        } 
        gameController.checkWinner(board)
    }
    function resetBoard(){
        board = [
            '','','',
            '','','',
            '','','',
        ]
        displayController.updateDisplay(board)
    }
    function isFull(){
        let flag = true
        for(let i=0;i<board.length;i++){
            if(board[i]==''){
                flag=false
            }
        }
        return flag
    }
    return {getBoard,setValue,resetBoard}
})()

const displayController = (()=>{
    let gridItems = []
    const container = document.querySelector(".container")
    const turnElement = document.querySelector("#turn")
    const player1 = Player('X')
    const player2 = Player('O')
    let winner = ''
    let currentTurn = player1.getSign()
    function init(){
        for(let i=0;i<9;i++){
            gridItems[i]=document.createElement('div')
            gridItems[i].className = 'gridItem'
            gridItems[i].dataset.number = `${i}`
            container.append(gridItems[i])
        }
        turnElement.textContent = `Turn: ${currentTurn}`
        gridItems.forEach(item=>{
            item.addEventListener('click',()=>{
                let index = item.dataset.number
                let sign = currentTurn
                gameBoard.setValue(index,sign)
            })
        })

    }
    function updateDisplay(board){
        for(let i=0;i<9;i++){
            gridItems[i].textContent = board[i]
        }
        if(currentTurn==player1.getSign()){
            currentTurn = player2.getSign()
        }
        else{
            currentTurn = player1.getSign()
        }
        turnElement.textContent = `Turn: ${currentTurn}`
    }

    return {init,updateDisplay}
})()

const gameController = (()=>{
    let winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]
    
    function init(){

    }
    function checkWinner(board){
        winConditions.forEach((winCondition)=>{
            if(board[winCondition[0]]==board[winCondition[1]]
                &&board[winCondition[1]]==board[winCondition[2]]){
                console.log(`Winner: Player ${board[winCondition[0]]}`)
            }
        })
    }
    return {checkWinner}
})()
displayController.init()