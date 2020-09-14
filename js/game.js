let width;
let heigth;
let tileSize;
let canvas;
let ctx;
let food;

function init(){
    
    tileSize = 20;

    width = tileSize * Math.floor(window.innerWidth / tileSize);
    heigth = tileSize * Math.floor(window.innerHeight / tileSize);

    canvas = document.getElementById("game-area");
    canvas.width = width;
    canvas.height = height;

    ctx = canvas.getContext("2d");

    food = new Food(spawnLocation(), "red")
}

class Food {

    constructor(pos, color){
        this.x = pos.x;
        this.y = pos.y;
        this.color = color;
    }

    draw(){

        ctx.beginPath();
        ctx.rect(this.x, this.y, tileSize, tileSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}

function spawnLocation(){

    let rows = width / tileSize;
    let cols = height / tileSize;

    let xPos, yPos;

    xPos = Math.floor(Math.random() * rows) * tileSize;
    yPos = Math.floor(Math.random() * cols) * tileSize;

    return { x: xPos, y: yPos};
}