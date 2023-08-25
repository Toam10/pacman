import Pacman from './Pacman.js';

export default class TileMap 
{
        constructor(tileSize) 
        {
            this.tileSize = tileSize;

            this.yellowDot = new Image();
            this.yellowDot.src = "../images/yellowDot.png";
            
            this.wall = new Image();
            this.wall.src = '../images/wall.png';
        }

        // 1 - wall 
        // 0 - dots 
        // 4 - pacman

        map = 
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,4,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,0,0,0,1,0,1],
            [1,0,1,0,1,1,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,0,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,1,0,1,0,0,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1],
        ];

        draw(context)
        {
            for(let row = 0; row < this.map.length; row++)
            {
                for(let column = 0; column < this.map[row].length; column++) 
                {
                    let tile = this.map[row][column];

                    if(tile === 1) 
                    {
                        this.drawWall(context, column, row, this.tileSize); 
                    }
                    else if (tile === 0)
                    {
                        this.drawDot(context, column, row, this.tileSize);
                    }

                    context.strokeStyle = 'yellow';
                    context.strokeRect(column * this.tileSize, row * this.tileSize,this.tileSize, this.tileSize )
                }
            }
        }

        drawDot(context, column, row, size)
        {
            context.drawImage(

                this.yellowDot,
                column * this.tileSize,
                row * this.tileSize, 
                size,
                size
            );
        };


        drawWall(context, column, row, size) 
        {
            context.drawImage(

                    this.wall,
                    column * this.tileSize,
                    row * this.tileSize, 
                    size,
                    size
                );
        }

        getPacman(velocity)
        {
            for(let row = 0; row < this.map.length; row++)
            {
                for(let column = 0; column < this.map[row].length; column++)
                {
                    let tile = this.map[row][column];

                    if(tile === 4)
                    {
                        this.map[row][column] = 0;
                        return new Pacman(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                    }
                }
            }
        }

        setCanvasSize(canvas) 
        {
            canvas.width = this.map[0].length * this.tileSize;
            canvas.height = this.map.length * this.tileSize;
        }
}