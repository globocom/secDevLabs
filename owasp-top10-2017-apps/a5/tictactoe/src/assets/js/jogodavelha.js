function newElement(tagName, ...classNames){
    const elem = document.createElement(tagName)
    const classes = classNames.reduce((ac, current) => {
        return ac + " " + current
    })
    elem.className = classes
    return elem
}

function finishGame(winner) {
    const boxInfo = newElement('div', 'boxinfo', 'pencilBorder')
    boxInfo.style['background-color'] = 'seagreen'
    let result = 'win'
    setPoint(winner)
    let message = 'You won!!'
    if (winner == 'O'){
        result = 'lose'
        message = 'You lose :('
        boxInfo.style['background-color'] = 'mediumvioletred'
    }else if (winner == 'velha'){
        result = 'tie'
        message = 'Tie...'
        boxInfo.style['background-color'] = 'darkgoldenrod'
    }
    sendResult(result)
    const body = document.querySelector('body')
    const button = newElement('div', 'buttonPlay', 'pencilBorder')
    button.innerHTML = 'PLAY AGAIN!'
    button.onclick = (e) => {
        const screen = document.querySelector('.gamegrid')
        const boxinfo = document.querySelector('.boxinfo')
        body.removeChild(screen)
        body.removeChild(boxinfo)
        HashGame()
    }
    boxInfo.innerHTML = message
    boxInfo.appendChild(button)
    body.appendChild(boxInfo)
}

function Checker(){
    this.possibleWins = [
        [0,1,2], [0,3,6], [0,4,8],
        [1,4,7], [2,4,6], [2,5,8],
        [3,4,5], [6,7,8]
    ]
    this.items = document.querySelectorAll('.item')


    this.check = () =>{
        for (const comb of this.possibleWins){
            if (this.items[comb[0]].attributes.value != undefined
                && this.items[comb[0]].attributes.value == this.items[comb[1]].attributes.value 
                && this.items[comb[0]].attributes.value == this.items[comb[2]].attributes.value){
                    const gamegrid = document.querySelector('.gamegrid')
                    gamegrid.style.pointerEvents = 'none'
                    gamegrid.style.opacity = 0.3
                    finishGame(this.items[comb[0]].innerHTML) 
                    return true
            }
        }
        
        const empty = [...this.items].filter((el) => {
            return el.attributes.value ? false : true
        })

        if (empty.length == 0){
            const gamegrid = document.querySelector('.gamegrid')
            gamegrid.style.pointerEvents = 'none'
            gamegrid.style.opacity = 0.3
            finishGame('velha')
            return true
        }
       
    }

}

function robotPlay() {
    const items = document.querySelectorAll('.item')
    const freeSpaces = [...items].filter((elem) => {
        return elem.attributes.filled ? false : true
    })

    const index = Math.floor(Math.random() * (freeSpaces.length))

    freeSpaces[index].attributes.filled = true
    freeSpaces[index].attributes.value = 'O'
    freeSpaces[index].innerHTML = 'O'

}

function Item(id){
    this.elem = newElement('div', 'item', 'pencilBorder')
    this.elem.id = id
    this.play = (checker) => {
        if (!this.elem.attributes.filled){
            this.elem.innerHTML = 'X'
            this.elem.attributes.value = 'X'
            this.elem.setAttribute("filled", true)
            if (!checker.check()){
                robotPlay()
                checker.check()
            }
        }
    }
    this.elem.onclick = (e) => {
        this.play(new Checker())
    }
}

function Screen(){
    this.elem = newElement('div', 'gamegrid')
}

function setPoint(name){
    if (name == 'velha'){
        return
    }
    let id = 'bender'
    if (name == 'X'){
        id = 'fry'
    }
    const p = document.querySelector(`#${id}Points`)
    p.innerHTML = parseInt(p.innerHTML, 10) + 1
}

function HashGame(){
    const screen = new Screen()
    for (let i = 0; i< 9; i++){
        const item = new Item(i)
        screen.elem.appendChild(item.elem)
    }
    const body = document.querySelector('body')
    body.appendChild(screen.elem)
}

HashGame()