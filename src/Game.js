import TileMap from "./TileMap.js";

const tileSize = 32;
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);


const gameLoop = () => {

    tileMap.draw(context);

}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);