const fs = require('fs');

const size = 6;
const word = Array(36).fill().map((el, idx) => idx + 1);

const solutions = [];

createMatrix(size, null).forEach((el, x) => {
    el.forEach((i, y) => {
        horseJump(x, y, 0, createMatrix(size, null))
    });
});

// const randSolution = Math.floor(Math.random() * solutions.length);
fs.writeFileSync('./solutions.json', JSON.stringify(solutions));

function horseJump(x, y, progress, mat) {
    mat[x][y] = word[progress];
    progress++;
    if (progress == word.length) {
        solutions.push(mat);
    }
    getPossibleJumps(x, y, mat).forEach(([newX, newY]) => {
        horseJump(newX, newY, progress, clone(mat));
    });
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getPossibleJumps(x, y, mat) {
    const jumps = [
        (x, y) => [x + 2, y + 1],
        (x, y) => [x + 2, y - 1],
        (x, y) => [x - 2, y + 1],
        (x, y) => [x - 2, y - 1],
        (x, y) => [x + 1, y + 2],
        (x, y) => [x + 1, y - 2],
        (x, y) => [x - 1, y + 2],
        (x, y) => [x - 1, y - 2],
    ]
    return jumps
    .map(jump => jump(x,y))
    .filter(([x, y]) => mat[x] !== undefined)
    .filter(([x, y]) => mat[x][y] === null)
}

function createMatrix(size, value) {
    return Array(size).fill().map((el) => Array(size).fill(value));
} 