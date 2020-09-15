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


function spawnLocation(){
    
    let rows = width / tileSize;
    let cols = height / tileSize;

    let xPos, yPos;
    
    xPos = Math.floor(Math.random() * rows) * tileSize;
    yPos = Math.floor(Math.random() * cols) * tileSize;
    
    return { x: xPos, y: yPos};
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

class Snake {
    constructor(pos, color){
        this.x = pos.x;
        this.y = pos.y;
        this.tail = [{ x: pos.x - tileSize, y:pos.y}, { x: pos.x - tileSize * 2, y: pos.y}]
        this.velX = 1;
        this.velY = 0;
        this.color = color;
    }

    // Drawing the snake on the canvas
    draw() {

        //Drawing the head of the snake
        ctx.beginPath();
        ctx.rect(this.x, this.y, tileSize, tileSize);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

        // Drawing the tail of the snake.
        for (var i=0; i < this.tail.length; i++){

            ctx.beginPath();
            ctx.rect(this.tail[i].x, this.tail[i].y, tileSize, tileSize);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.stroke() = 3;
            ctx.closePath();

        }
    }

    // Moving the snake by updating position
    move() {

        //Movement of the tail
        for (var i = this.tail.length -1; i > 0; i--) {
            
            this.tail[i] = this.tail[i-1];
        }

        // Updating the start of the tail to acquire the position of the head
        if (this.tail.length != 0)
            this.tail[0] = { x: this.x, y: this.y};

        this.x += this.velX * tileSize;
        this.y += this.velY * tileSize;
    }

    // Changing the direction of movement of the snake
    dir(dirX, dirY){
        this.velX = dirX;
        this.velY = dirY;
    }

    // Determine whether the snake has eaten a piece of food.
    eat(){

        if(Math.abs(this.x - food.x) < tileSize && Math.abs(this.y - food.y) < tileSize){

            //Adding to the tail
            this.tail.push({});
            return true;
        }
        return false;
    }

    // Checking of the snake has died
    die(){
        for (var i = 0; i < this.tail.length; i++){
            if(Math.abs(this.x - this.tail[i].x) < tileSize && Math.abs(this.y - this.tail[i].y) < tileSize){
                return true;
            }
        }
        return false;
    }

    border(){

        if(this.x + tileSize > width && this.velX != -1 || this.x < 0 && this.velX != 1)
            this.x = width - this.x;
        else if(this.y + tileSize > heigth && this.velY != -1 || this.velY != 1 && this.y < 0)
            this.y = heigth - this.y;
    }
}