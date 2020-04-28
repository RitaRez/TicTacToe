window.onload = buildBoard();

function buildBoard(){
    let w;
    let id = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            $('#r'+i).append('<div id="'+id+'" class="cell col-4"></div>')
            w = $('#'+id).width();
            $("#"+id).css('height', w);
            $("#"+id).css('max-width' , w);
            $("#"+id).css('padding', 0);
            $("#"+id).css('border-color', 'white');
            $("#"+id).css('border-width', 'thin');
            $("#"+id).append('<p id="s'+id+'" class="align-middle"></p>');
            if(i < 2 && j < 2)
                $("#"+id).css('border-style', 'none solid solid none');
            else if(i<2)
                $("#"+id).css('border-style', 'none none solid none');
            else if(j<2)
                $("#"+id).css('border-style', 'none solid none none');
            id++;    
        }
    }
    $('#board').css('max-width', w*3)
    $('#board').css('max-height', w*3)

    var b = $('#board').width();
    $('#game').css('width', b*(12/10));
    $('#game').css('height', b*(12/10));
    $('#game').css('padding', (b*(2/10)/2));

}
let max = 0;
var origBoard = []
var huBoard = [];
var aiBoard = [];
const huPlayer = 'O', aiPlayer = 'X';
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {    
    document.querySelector(".endgame").style.display = "none";
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].addEventListener('click', turnClick, false); 
    }
    for (let i = 0; i < 9; i++) origBoard[i] = i;
}
function checkWin(board, player){
    let new_arr = [];
    board.forEach((el, i)=>{
        if(el == player) new_arr.push(i)
    });
    new_arr.sort()
    let checker = (arr, target) => target.every(v => arr.includes(v));   
    let includes = false; 
    winCombos.forEach(el => {
        if(checker(new_arr, el)) includes = true;
    });
    return includes;
}
function checkTie(){
    let availSpots = emptySquares();
    if(availSpots.length === 0 && !checkWin(aiBoard) && !checkWin(huBoard)) return true;
    else return false;
}
function turn(obj, player) {
    let id = parseInt(obj.index)  
    origBoard[id] = player;
    aiBoard.push(id);
    let el = document.getElementById(id);
    el.innerText = player;
    assemblesPiece(el);
}
function assemblesPiece(el){
    let w = el.clientWidth;
    let h = el.clientHeight;
    el.style.fontSize = w*0.9 + 'px';
    el.style.lineHeight = w*0.9 + 'px';
    el.align = 'center';
    el.marginTop = w*(-0.2) + 'px';
}
function turnClick(el){
    if(aiBoard.includes(parseInt(el.target.id)) || huBoard.includes(parseInt(el.target.id))) 
        return false;
    el.target.innerText = huPlayer;
    assemblesPiece(el.target);
    huBoard.push(parseInt(el.target.id));
    origBoard[parseInt(el.target.id)] = huPlayer;
    if (!checkWin(origBoard, aiPlayer)&& !checkWin(origBoard, huPlayer) && !checkTie()) {
        turn(minimax(origBoard, aiPlayer), aiPlayer);
    }    
}
function emptySquares(){
    let arr = [];
    for (let i = 0; i < 9; i++) {
        if(origBoard.includes(i)) arr.push(i);
    }
    return arr;
}
function minimax(newBoard, player){
    let availSpots = emptySquares();
    if (checkWin(newBoard, aiPlayer)) return {score: 10};
    else if (checkWin(newBoard, huPlayer)) return {score: -10};
	else if (availSpots.length === 0) return {score: 0};

    var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;
		if (player == aiPlayer) {
			var result =  minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}
		newBoard[availSpots[i]] = move.index;
		moves.push(move);
    }
 
    let bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
    return moves[bestMove];
}