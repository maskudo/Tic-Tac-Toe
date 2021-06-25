const Player = (sign)=>{
    const getSign = ()=> {return sign}
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
        if(board[index]!=''){
            board[index]=sign

        } 
    }
    return {getBoard,setValue}
})()

const displayController = (()=>{
    let gridItems = []
    const container = document.querySelector(".container")

    function init(){
        for(let i=0;i<9;i++){
            gridItems[i]=document.createElement('div')
            gridItems[i].className = 'gridItem'
            gridItems[i].dataset.number = `${i}`
            container.append(gridItems[i])
        }
        console.log(gridItems)
    }
    function updateDisplay(board){
        for(let i=0;i<9;i++){
            gridItems[i].textContent = board[i]
        }
    }
    return {init,updateDisplay}
})()

displayController.init()
displayController.updateDisplay(gameBoard.getBoard())