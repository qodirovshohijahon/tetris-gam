document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartButton = document.querySelector('#start-button');
    const width = 10;

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
    let timerId = setInterval(moveDown, 1000)

    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if(e.keyCode === 39) {
            moveRight()
        } else if(e.keyCode === 39) {
            //
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
            random = Math.floor(Math.random() * theTetri.length)
            current = theTetri[random][currentRotation]
            currentPosition = 4
            draw()
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
        currentPosition ++
        if(currentRotation === current.length) { //agar currentRotation  = 4 bo'lsa 4 ga aylantir
            currentRotation = 0
        }
    }
})