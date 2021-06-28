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
        if(gameController.isOver()){
            displayController.deleteListener()
            displayController.displayWinner(gameController.getWinner())
        }
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
    return {getBoard,setValue,resetBoard,isFull}
})()

const displayController = (()=>{
    let gridItems = []
    const container = document.querySelector(".container")
    const turnElement = document.querySelector("#turn")
    const winnerDisplay = document.querySelector("#winnerDisplay")
    const restartButton = document.querySelector("#restart")
    const player1 = Player('X')
    const player2 = Player('O')
    let currentTurn = player1.getSign()

    function init(){
        for(let i=0;i<9;i++){
            gridItems[i]=document.createElement('div')
            gridItems[i].className = 'gridItem'
            gridItems[i].dataset.number = `${i}`
            container.append(gridItems[i])
        }
        turnElement.textContent = `Turn: ${currentTurn}`
        addListener()
        
        restartButton.addEventListener('click',()=>{
            gameBoard.resetBoard()
            clearWinner()
            gameController.resetWinner()
            addListener()
        })
    }
    function addListener(){
        gridItems.forEach(item=>{
            item.addEventListener('click',eventFunction)
        })
    }
    function eventFunction(){
        let index = this.dataset.number
        let sign = currentTurn
        gameBoard.setValue(index,sign)
    }
    function deleteListener(){
        gridItems.forEach(item=>{
            item.removeEventListener('click',eventFunction)
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
    function displayWinner(winner){
        if(winner=='X' || winner=='O'){
            winnerDisplay.textContent = `Player ${winner} wins!`
        }
        else{
            winnerDisplay.textContent = `Draw!`
        }
    }
    function clearWinner(){
        winnerDisplay.textContent = ''
    }

    return {init,updateDisplay,deleteListener,displayWinner,clearWinner}
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
    let winner = ''
    
    function init(){
        displayController.init()
    }
    function hasWinner(board){
        let flag = false
        winConditions.forEach((winCondition)=>{
            if(board[winCondition[0]]==board[winCondition[1]]
                &&board[winCondition[1]]==board[winCondition[2]]
                &&board[winCondition[1]]!=''){
                    winner = board[winCondition[1]]
                    flag = true
                    return
            }
        })
        return flag
    }
    function getWinner(){
        return winner
    }
    function resetWinner(){
        winner = ''
    }
    function isOver(){
        if(gameBoard.isFull() || hasWinner(gameBoard.getBoard())){
            return true
        }
        return false
    }
    return {hasWinner,isOver,getWinner,resetWinner,init}
})()
gameController.init()