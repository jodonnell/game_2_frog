
var canvas = document.getElementById('gamewindow')
var ctx = canvas.getContext('2d')

const GRID = 60;
const C_WIDTH = canvas.width = GRID*10;
const C_HEIGHT = canvas.height = GRID*8;


////colors////

const 	RED 	= '#e40058',
	GREEN	= '#58d854',
	DGREEN	= '#00a800',
	YELLOW	= '#d8f878',
	WHITE	= 'white',
	BROWN	= '#c2b193',
	GREY	= '#787878';

const PLAYER_SPR = {
0:[[GREEN,10,20,40,40],[WHITE,15,15,10,5],[WHITE,35,15,10,5],[YELLOW,15,25,30,35],[DGREEN,15,25,30,2]],
1:[[GREEN,10,30,40,30],[WHITE,15,25,10,5],[WHITE,35,25,10,5],[YELLOW,15,35,30,25],[DGREEN,15,35,30,8]]

}

var FRAME = 0;
var player = {
	x:GRID*5,
	y:GRID*7,
	xSpeed:0,
	ySpeed:0,
	moveing:false
}


