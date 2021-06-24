const container = document.querySelector(".container")
let gridItem = []

function createGrid(size){
    for(let i=0;i<size*size;i++){
        gridItem[i] = document.createElement('div')
        gridItem[i].className = 'gridItem'
        container.append(gridItem[i])
    }
    container.style.gridTemplateColumns = `repeat(${size},auto)`
}
createGrid(3)
