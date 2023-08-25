import Pacman from './Pacman.js';
import MovingDirection from './MovingDirection.js';

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
                    if (tile === 0)
                    {
                        this.drawDot(context, column, row, this.tileSize);
                    }

                    // context.strokeStyle = 'yellow';
                    // context.strokeRect(column * this.tileSize, row * this.tileSize,this.tileSize, this.tileSize )
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

        didCollideWithEnvironment(x, y, direction)
        {
            if(direction == null) return;

            if(Number.isInteger( x / this.tileSize) && Number.isInteger( y / this.tileSize) )
            {
                let column = 0;
                let row = 0;
                let newColumn = 0;
                let nextRow = 0;

                switch(direction)
                {
                    case MovingDirection.right:
                            newColumn = x + this.tileSize;
                            column    = newColumn / this.tileSize;
                            row       = y / this.tileSize
                        break;

                    case MovingDirection.left:
                            newColumn = x - this.tileSize;
                            column    = newColumn / this.tileSize;
                            row       = y / this.tileSize
                        break;

                    case MovingDirection.up:
                            nextRow = y - this.tileSize;
                            row     = nextRow / this.tileSize;
                            column  = x / this.tileSize;
                        break;

                    case MovingDirection.down:
                            nextRow = y + this.tileSize;
                            row     = nextRow / this.tileSize;
                            column  = x / this.tileSize;
                        break;
                }
                const tile = this.map[row][column];

                if(tile === 1)
                {
                    return true;
                }
            }
            return false;
        }
}