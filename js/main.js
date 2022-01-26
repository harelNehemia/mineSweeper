'use strict'

var gBoard;
// CELL = { minesAroundCount: 4, isShown: true, isMine: false, isMarked: true };
var gLevel;
// { SIZE: 4, MINES: 2 };
var gGame;
// { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };

// const MINE = 'MINE';
// const FLAG = 'FALG';

const MINE_IMG = '💣';
const FLAG_IMG = '🚩';



function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {

    //create matrix 4*4
    var board = createMat(4, 4);

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
            board[i][j] = cell;
        }
    }

    board[1][2].isMine = true;
    board[3][0].isMine = true;

    console.table(board);
    return board;
}


function setMinesNegsCount(cellI, cellJ, board) {
    var count = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === cellI && j === cellJ) continue
            if (board[i][j].isMine === true) count++
        }
    }
    return count
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            strHTML += `\t<td class="cell ${cellClass}"  onclick="cellClicked(${i},${j})" >\n`;

            //  display mines and flags
            if (currCell.isMine === true) {
                strHTML += MINE_IMG;
            } else if (currCell.isMarked === true) {
                strHTML += FLAG_IMG;
            }
            // mines negs count
            if (!currCell.isMine) {
                currCell.minesAroundCount = setMinesNegsCount(i, j, board)
                strHTML += `${currCell.minesAroundCount}`;
            }


            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    console.log(i, j);
    // model 

    // dom

    // elCell.innerTEXT = elCell.minesAroundCount

}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}