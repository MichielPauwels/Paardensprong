var solutions = [];
var solution;
var spinner;

function loadElements() {
    solution = document.getElementById('solution');
    spinner = document.getElementById('spinner');
    console.log(solution, spinner);
}

function getSolution() {
    spinner.style.display = 'block';
    solution.innerHTML = '';

    const size = Number(getValue('number'));
    console.log(size);
    const word = getValue('text').trim().toUpperCase();

    const idx = Math.floor(Math.random() * allSolutions[size].count);
    const matrix = allSolutions[size].solutions[idx];
    let offset = Math.floor(Math.random() * allSolutions[size].maxLength - word.length);
    offset = offset < 0 ? 0 : offset;

    const filledSolution = fill(matrix, word, offset);

    spinner.style.display = 'none';
    
    const tbl = makeTable(size, filledSolution.matrix, filledSolution.firstPos);
    solution.appendChild(tbl);
}

function fill(matrix, word, offset) {
    const filled = createMatrix(matrix.length, null);
    let firstPos;
    matrix.forEach((row, x) => {
        row.forEach((el, y) => {
            if (el === 1) { firstPos = [x, y]; }
            if (el !== null) {
                filled[x][y] = word[el - 1 - offset] || null;
            }
        });
    });
    return {
        matrix: filled,
        firstPos: firstPos
    };
}

function makeTable(size, solution, first) {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            if (solution[i][j] === null) {
                cell.style.backgroundColor = 'black';
            } else {
                if(i === first[0] && j === first[1]) {
                    cell.style.border = '2px solid blue';
                }
                const cellText = document.createTextNode(solution[i][j]);
                cell.appendChild(cellText);
            }
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    return tbl;
}

function createMatrix(size, value) {
    return Array(size).fill().map((el) => Array(size).fill(value));
}

function getValue(id) {
    return document.getElementById(id).value;
}