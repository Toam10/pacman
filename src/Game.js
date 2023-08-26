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

    drawGameEnd();

    pacman.draw( context, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(context, pause(), pacman ) );
    
    checkGameOver();
    checkGameWin();
}

const checkGameWin = () => {
    if(!gameWin) 
    {
        gameWin = tileMap.didWin();

        if(gameWin)
        {
            gameWinSound.play();
        }
    }
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
    return !pacman.madeFirstMove || gameOver || gameWin;
}

const drawGameEnd = () => {

    if(gameOver || gameWin)
    {
        let text = '   You Win   ';

        if(gameOver)
        {
            text = ' Game Over ';
        }

        context.fillStyle = 'black';
        context.fillRect(0, canvas.height / 3.2, canvas.width, 80);

        context.font = '80px comic sans';

        const gradient = context.createLinearGradient(0, 0, canvas.width, 0);

        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');

        context.fillStyle = gradient;
        context.fillText(text, 10, canvas.height / 2 );
    }
}

tileMap.setCanvasSize( canvas );
setInterval(gameLoop, 1000 / 75);