const field = document.querySelector('.field')
const btn = document.querySelector('#btn')
const scoreDisplay = document.querySelector('#score')
let squares = []
let snake = [2, 1, 0]
let direction = 1 
let appleIndex = 0
let score = 0
let speedUp = 0.9
let speed = 800
let timer = 0
const width = 10 // so this depends on how many square per row it is so if it 10 x 10 
// to go up or down just -width(up) or +width(down)

// to create element / field > put in array 
function createField() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        field.appendChild(square)
        // push square > squares 
        squares.push(square)
    }
}
createField()

//for Each() to apply each index in array  
// snake index(i) = [0, 1, 2] > add it to squares which is contain [100 div]
// so I use snake(i) to assign where the snake is 
snake.forEach(i => squares[i].classList.add('snake')) // add snake

function startGame () {
    snake.forEach(i => squares[i].classList.remove('snake'))
    snake.forEach(i => squares[i].classList.remove('dead'))
    scoreDisplay.classList.remove('dead')
    //remove snake
    squares[appleIndex].classList.remove('apple')
    //remove apple 
    clearInterval(timer)
    snake = [2, 1, 0]
    direction = 1
    score = 0
    scoreDisplay.textContent = score
    // re add new score 
    speed = 800
    appleSpawn()
    snake.forEach(i => squares[i].classList.add('snake'))
    // re add class of snake to new snake 
    timer = setInterval(move, speed)
}

function move () {

    if((snake[0] + width  >= width*width && direction === width) || // at bottom wall + still going down direction
    (snake[0] % width === width-1 && direction === 1) || // at right wall + still going right direction
    (snake[0] % width === 0 && direction === -1) || // at left wall + still going left direction
    (snake[0 - width < 0 && direction === -width]) ||// at top of waall + still going up  
    squares[snake[0] + direction].classList.contains('snake') // already contain snake class  = go back the same direction
    ){
        snake.forEach(i => squares[i].classList.add('dead'))
        scoreDisplay.classList.add('dead')
        return clearInterval(timer) 
    }
    
     // stop snake from moving 

    // to move snake use pop + unshift method 
    const tail = snake.pop()
    squares[tail].classList.remove('snake')
    // unshift + styling where snake head to > 
    // to move right only 
    snake.unshift(snake[0] + direction)

    //snake head eatting apple 
    if(squares[snake[0]].classList.contains('apple')) { 
        // remove apple 
        squares[snake[0]].classList.remove('apple')
        // grow snake +1 > longer 
        squares[tail].classList.add('snake')
        snake.push(tail)
        // spawn new apple 
        appleSpawn()
        // adding score 
        score++
        // display 
        scoreDisplay.textContent = score
        // speed up snake 
        clearInterval(timer)
        console.log(speed)
        speed = speed * speedUp
        console.log(speed)
        timer = setInterval(move, speed)
    }


    squares[snake[0]].classList.add('snake')

    // optional
    // const heed = snake.unshift(snake[0] + direction)
    // squares[head].classList.add('snake')
}
move()

// mode easy = 1200 / normal = 800 / hard = 400

// use e.key
function controler(event) {
    if(event.keyCode === 37) {
        console.log('left arrow')
        direction = -1
    } else if(event.keyCode === 38) {
        console.log('up arrow')
        direction = -width
    } else if(event.keyCode === 39) {
        console.log('right arrow')
        direction = 1
    }else if(event.keyCode === 40) {
        console.log('down arrow')
        direction = +width
    }
}
document.addEventListener('keydown', controler)
// keyup > when finger leave the keyboard
// keydown > when you press keyboard

// keycode *** old method *** 
// ref. https://keycode.info/
// 37 is for the left arrow
// 38 is for the up arrow
// 39 is right arrow
// 40 is for the down arrow
// if(event.keyCode === 37) {
//     console.log('left arrow')
// } else if(event.keyCode === 38) {
//     console.log('up arrow')
// } else if(event.keyCode === 39) {
//     console.log('right arrow')
// }else if(event.keyCode === 40) {
//     console.log('down arrow')
// }

function appleSpawn() {
    do {
        appleIndex = Math.floor(Math.random() * 100)
    }while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple') //  <<< if not
}
appleSpawn() 

btn.addEventListener('click', startGame)

