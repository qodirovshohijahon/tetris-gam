document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    //tetrimino

    const lTetrimino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width * 2, width * 2 + 1, width * 2 + 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];

    const zTetrimino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
    ];

    const tTetrimino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width+2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetrimino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetrimino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTetri = [lTetrimino, zTetrimino, tTetrimino, oTetrimino, iTetrimino];

    //Elementni burish

    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetri.length)
    let current = theTetri[random][0];
    console.log(current);

    //draw the fitst rotation

    function draw() {
        current.forEach(index => {
          squares[currentPosition + index].classList.add('tetrimino')
         // console.log("dra", currentPosition + index)
 
        })
    }

  //  draw();

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetrimino');
        //console.log("und", currentPosition + index)
        })
    }

    //element ni pastga tushutish
//    let timerId = setInterval(moveDown, 1000)

    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if(e.keyCode === 38) {
            rotate()
        } else if(e.keyCode === 39) {
            moveRight()
        } else if(e.keyCode === 40) {
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))

            //yangi tetris boshlash
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetri.length)
            current = theTetri[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore();
        }
    }

    //chegarag yetganda o'ngga burilishdan to'xtatish

    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index ) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1;

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }
        draw()
    }
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        
        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -= 1;
        }
        draw()
    }


    //tetrisni burish

    function rotate() {
        undraw()
        currentRotation ++
        if(currentRotation === current.length) { //agar currentRotation  = 4 bo'lsa 4 ga aylantir
            currentRotation = 0
        }
        current = theTetri[random][currentRotation]
        draw()
    }


    //keyingi shaklni ko'rsatish
    const displaySquares = document.querySelectorAll('mini-grid div')
    const displayWidth = 4;
    let displayIndex = 0;

    const upNextTetri = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, displayWidth * 2 + 1,displayWidth * 3 + 1],
    ]

    //    kichik shaklni ifodalash
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetrimino')
        })
        upNextTetri[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetrimino')
        })
    }

    startButton.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetri.length)
            displayShape()
        }
    })

    function addScore() {
        for(let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i+ 7, i + 8, i + 9];

            if(row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                })
                const squaresRemoved = squares.splice(i, width)
//                console.log(squaresRemoved)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }
})
