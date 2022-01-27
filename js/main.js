'use strict'

const MINE = '💣';
const FLAG = '🚩';


var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: true, shownCount: 0, markedCount: 0, secsPassed: 0 };

function changeLevel(size,mines){
    gLevel.SIZE = size
    gLevel.MINES = mines
    initGame()
}


function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {

    //create matrix
    var board = createMat(gLevel.SIZE,gLevel.SIZE);

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }
            board[i][j] = cell;
        }
    }
    for (var m = 0; m < gLevel.MINES; m++){
        board[getRandomInt(0,gLevel.SIZE - 1)][getRandomInt(0,gLevel.SIZE - 1)].isMine = true;
    }

    // board[0][0].isMarked = true;
    // console.table(board);
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

function cellClicked(i, j, elCell) {
    // model 
    var currCell = gBoard[i][j]
    if(!currCell.isMarked){
    currCell.isShown = true
    // dom
    // elCell.classList.add('clicked')
    }  
    gGame.shownCount++
    renderBoard(gBoard)
    checkGameOver()
}


function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            strHTML += `\t<td class="cell ${cellClass}"  onclick="cellClicked(${i},${j},this)" oncontextmenu="cellMarked(this, ${i}, ${j})" >\n`;

            if (currCell.isShown) {
                //  display mines and flags
                if (currCell.isMine === true) {
                    strHTML += MINE;
                } else if (currCell.isMarked === true) {
                    strHTML += FLAG;
                }
                // mines negs count
                if (!currCell.isMine) {
                    currCell.minesAroundCount = setMinesNegsCount(i, j, board)
                    strHTML += `${currCell.minesAroundCount}`;
                }
            }


            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function cellMarked(elCell, i, j) {
    window.event.preventDefault()
    if(!gBoard[i][j].isShown){
        // gBoard[i][j].isMarked = true;
        elCell.classList.toggle('cell-marked')
    } 
    // renderBoard(gBoard)
}

function checkGameOver() {
    if(gGame.shownCount === gLevel.SIZE ** 2)
    console.log('Game Over!');
}

function expandShown(board, elCell, i, j) {

}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}