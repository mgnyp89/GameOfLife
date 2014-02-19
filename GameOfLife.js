
var size = 50;
var grid = [];
var grid2 = [];
var flag = false;
var interval = 400;
var execution; 
var step = 0;
function init() {
	for(var i=1; i<=size; i++) {
		grid[i] = new Array(size);
		grid2[i] = new Array(size);
	}
	for(var i=1; i<=size; i++) {
			for (var j=1; j<=size; j++) {
				grid[i][j] = false;
				grid2[i][j] = false;
			}
	}
}
function drawTheGrid() {
	var grid = '<table id="container">';
		for(var i=1; i<=size; i++) {
			grid += '<tr id="'+i+'">';
			for (var j=1; j<=size; j++) {
				grid +='<td class="'+j+'">';
				grid +='</td>';
			}
			grid += '</tr>';
		}
	grid += '</table>';
	$('#grid').append(grid);
}
function getNeighbours(i,j,grid) {
	i = parseInt(i);
	j = parseInt(j);
	var neighbours = 0;
	// middle pieces
	if(i!=1 && j!=1 && i!=size && j!=size) {
		if (grid[i-1][j-1] == true) neighbours++;
		if (grid[i-1][j] == true) neighbours++;
		if (grid[i-1][j+1] == true) neighbours++;
		if (grid[i][j-1] == true) neighbours++;
		if (grid[i][j+1] == true) neighbours++;
		if (grid[i+1][j-1] == true) neighbours++;
		if (grid[i+1][j] == true) neighbours++;
		if (grid[i+1][j+1] == true) neighbours++;
	}
	// top left corner
	else if (i==1 && j==1) {
		if (grid[i][j+1] == true) neighbours++;
		if (grid[i+1][j] == true) neighbours++;
		if (grid[i+1][j+1] == true) neighbours++;
	}
	// top right corner
	else if (i==1 && j==size) {
		if (grid[i][j-1] == true) neighbours++;
		if (grid[i+1][j] == true) neighbours++;
		if (grid[i+1][j-1] == true) neighbours++;
	}
	// bottom left corner
	else if (i==size && j==1) {
		if (grid[i][j+1] == true) neighbours++;
		if (grid[i-1][j] == true) neighbours++;
		if (grid[i-1][j+1] == true) neighbours++;
	}
	// bottom right corner
	else if (i==size && j==size) {
		if (grid[i][j-1] == true) neighbours++;
		if (grid[i-1][j] == true) neighbours++;
		if (grid[i-1][j-1] == true) neighbours++;
	}
	// top border
	else if (i==1) {
		if (grid[i][j-1] == true) neighbours++;
		if (grid[i][j+1] == true) neighbours++;
		if (grid[i+1][j] == true) neighbours++;
		if (grid[i+1][j-1] == true) neighbours++;
		if (grid[i+1][j+1] == true) neighbours++;
	}
	// bottom border
	else if (i==size) {
		if (grid[i][j-1] == true) neighbours++;
		if (grid[i][j+1] == true) neighbours++;
		if (grid[i-1][j] == true) neighbours++;
		if (grid[i-1][j-1] == true) neighbours++;
		if (grid[i-1][j+1] == true) neighbours++;
	}
	// left border
	else if (j==1) {
		if (grid[i-1][j] == true) neighbours++;
		if (grid[i+1][j] == true) neighbours++;
		if (grid[i-1][j+1] == true) neighbours++;
		if (grid[i][j+1] == true) neighbours++;
		if (grid[i+1][j+1] == true) neighbours++;
	}
	// right border
	else if (j==size) {
		if (grid[i-1][j] == true) neighbours++;
		if (grid[i+1][j] == true) neighbours++;
		if (grid[i-1][j-1] == true) neighbours++;
		if (grid[i][j-1] == true) neighbours++;
		if (grid[i+1][j-1] == true) neighbours++;
	}
	return neighbours;
}
function birth(i, j, board) {
	board[i][j] = true;
}
function survival(i, j,board) {
	board[i][j] = true;
}
function death(i, j, board) {
	board[i][j] = false;
}
function simulate(neighbours, i, j, state, board) {
	if(neighbours == 3) {
		birth(i, j, board);
	}
	else if ((neighbours == 3 || neighbours == 2) && state == true ) {
		survival(i, j, board);
	}
	else {
		death(i, j, board);
	}
}
function run() {
	var neighbours = 0; 
	var state;
		for (var i=1; i<=size; i++) {
			for(var j=1; j<=size; j++) {
				if(flag) {
					state = grid2[i][j];
					neighbours = getNeighbours(i, j, grid2);
					simulate(neighbours, i, j, state, grid);
				}
				else {
					state = grid[i][j];
					neighbours = getNeighbours(i, j, grid);
					simulate(neighbours, i, j, state, grid2);
				}
			}
		}
		step++;
		if(flag) {
			$('#step').empty();
			$('#step').append(step);
			flag = false;
			return grid;
		}
		else  { 
			$('#step').empty();
			$('#step').append(step);
			flag = true;
			return grid2;
		}
}
function iterate(board) {
	for(var i=1; i<=size; i++) {
			for (var j=1; j<=size; j++) {
				if(board[i][j] == true) {
					$("#"+i+" ."+j+"").css('background-color','#000000');
				}
				else {
					$("#"+i+" ."+j+"").css('background-color','transparent');
				}
			}
	}
}
function step() {
	iterate( run() );
}
function reset() {
	clearInterval(execution);
	$('#step').empty();
	interval = 400;
	step = 0;
	$('#container td').css("background-color","transparent");
	for(var i=1; i<=size; i++) {
			for (var j=1; j<=size; j++) {
				grid[i][j] = false;
			}
	}
	flag = false;
}
function start() {
		execution = setInterval(function(){iterate(run())},interval);
}
function speedUp() {
	if (interval > 100){ 
		clearInterval(execution);
		interval -= 100;
		start();
	}
}
function slowDown() {
	if (interval < 10000) {
		 clearInterval(execution);
		 interval += 100;
		 start();
	 }
}
function stop() {
	clearInterval(execution);
}
