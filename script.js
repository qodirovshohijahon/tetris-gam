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

    let currentPosition = 4;
    let current = theTetri[0];

    console.log(current);

    //draw the fitst rotation

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetrimino')
        })
    }

    draw();
})