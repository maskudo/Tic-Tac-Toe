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
    }
    return {getBoard,setValue}
})()

const displayController = (()=>{
    let gridItems = []
    const container = document.querySelector(".container")
    const turnElement = document.querySelector("#turn")
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

})()
displayController.init()