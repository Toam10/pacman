import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman( velocity );
const enemies = tileMap.getEnemies( velocity )


let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio('../sounds/gameOver.wav');
const gameWinSound = new Audio('../sounds/gameWin.wav');

const gameLoop = () => {

    tileMap.draw( context );
    pacman.draw( context, pause() );
    enemies.forEach((enemy) => enemy.draw(context, pause(), pacman ) );
    
    checkGameOver();
}

const checkGameOver = () => {
    if(!gameOver)
    {
        gameOver = isGameOver();

        if(gameOver)
        {
            gameOverSound.play();
        }
    }
}

const isGameOver = () => {

    return enemies.some(enemy => !pacman.powerDotActive && enemy.collideWith( pacman ));
}

const pause = () => {
    return !pacman.madeFirstMove || gameOver;
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);