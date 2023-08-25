import TileMap from "./TileMap.js";

const tileSize = 32;
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman( velocity );
const enemies = tileMap.getEnemies( velocity )


const gameLoop = () => {

    tileMap.draw(context);
    pacman.draw(context)
    enemies.forEach((enemy) => enemy.draw(context, pause(), pacman ) );

}

const pause = () => {
    return !pacman.madeFirstMove;
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);