'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('#board');

    const WIDTH = 25;
    const HEIGHT = 25;

    function generateSquares() {
        let squaresNumber = WIDTH * HEIGHT;

        for (let i = 0; i < squaresNumber; i++) {
            let square = document.createElement('div');

            square.classList.add('square');
            board.append(square);

            square.addEventListener('mouseover', () => setColor(square));
            square.addEventListener('mouseleave', () => removeColor(square));
        }
    }

    function setColor(square) {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        square.style.boxShadow = `0px 0px 2px rgb(${r}, ${g}, ${b}), 0px 0px 10px rgb(${r}, ${g}, ${b})`;
    }
    function removeColor(square) {
        square.style.backgroundColor = '#1d1d1d';
        square.style.boxShadow = `0px 0px 2px #000`;
    }

    

    generateSquares();
});