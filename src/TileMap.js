import Pacman from './Pacman.js';
import Enemy from './Enemy.js';
import MovingDirection from './MovingDirection.js';

export default class TileMap 
{
        constructor(tileSize) 
        {
            this.tileSize = tileSize;

            this.yellowDot = new Image();
            this.yellowDot.src = "../images/yellowDot.png";

            this.pinkDot = new Image();
            this.pinkDot.src = "../images/pinkDot.png";

            this.powerDot = this.pinkDot
            this.powerDotAnimationTimerDefault = 100;
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
            
            this.wall = new Image();
            this.wall.src = '../images/wall.png';

            this.wallBlock = new Image();
            this.wallBlock.src = '../images/wallBlock.png';
            this.wallBlock.style.display = false
        }

        // 1 - wall 
        // 2 - wallBlock
        // 0 - dots 
        // 4 - pacman
        // 5 - empty space
        // 6 - enemy
        // 7 - power dot

        map = 
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,7,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,6,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,7,0,0,0,0,1,0,1,7,1],
            [1,0,1,7,1,1,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,0,1,0,1,0,1],
            [1,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,1,1,1,1,0,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,6,0,0,0,1,0,1],
            [1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,1,0,,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1,1,2,2,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,1,0,1,5,5,5,5,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,0,1,5,6,6,6,1,0,1,1,0,1,0,1,0,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1,0,0,0,7,0,0,1],
            [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1],
            [1,0,1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,1,1,1,1,0,0,0,6,0,0,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1],
            [1,7,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
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
                        this.#drawWall(context, column, row, this.tileSize); 
                    }
                    else if(tile === 2) 
                    {
                        this.#drawWallBlock(context, column, row, this.tileSize); 
                    }
                    else if (tile === 0)
                    {
                        this.#drawDot(context, column, row, this.tileSize);
                    }
                    else if (tile === 7)
                    {
                        this.#drawPowerDot(context, column, row, this.tileSize);
                    }
                    else
                    {
                        this.#drawBlank(context, column, row, this.tileSize);
                    }

                    // context.strokeStyle = 'yellow';
                    // context.strokeRect(column * this.tileSize, row * this.tileSize,this.tileSize, this.tileSize )
                }
            }
        }

        #drawDot( context, column, row, size )
        {
            context.drawImage(

                this.yellowDot,
                column * this.tileSize,
                row * this.tileSize, 
                size,
                size
            );
        };

        #drawPowerDot( context, column, row, size )
        {
            this.powerDotAnimationTimer--;

            if(this.powerDotAnimationTimer === 0)
            {
                this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;

                if(this.powerDot == this.pinkDot)
                {
                    this.powerDot = this.yellowDot;
                }
                else
                {
                    this.powerDot = this.pinkDot;
                }
            }

            context.drawImage(

                this.powerDot,
                column * this.tileSize,
                row * this.tileSize, 
                size,
                size
            );
        }

        #drawWall( context, column, row, size ) 
        {
            context.drawImage(

                    this.wall,
                    column * this.tileSize,
                    row * this.tileSize, 
                    size,
                    size
                );
        }

        // Need to handle the wallBlock in the cage that will be open every 5 seconds

        #drawWallBlock( context, column, row, size )
        {
            const customWidth = size * 1;  // Set your desired width
            const customHeight = size * 0.7; // Set your desired height

            context.fillStyle = 'black';

            context.fillRect(
                column * this.tileSize + (size - customWidth) / 1,
                row * this.tileSize + (size - customHeight) / 1,
                customWidth,
                customHeight
            );

            context.drawImage(
                this.wallBlock,
                column * this.tileSize + (size - customWidth) / 0, // Center the image horizontally
                row * this.tileSize + (size + customHeight) / 0,   // Center the image vertically
                // customWidth,
                // customHeight
            );
        }

        #drawBlank(context, column, row, size)
        {
            context.fillStyle = "black";
            context.fillRect(column * this.tileSize, row * this.tileSize, size, size);
        }

        getPacman( velocity )
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

        getEnemies( velocity )
        {
            const enemies = []

            for(let row = 0; row < this.map.length; row++)
            {
                for(let column = 0; column < this.map[row].length; column++)
                {
                    const tile = this.map[row][column];

                    if(tile === 6)
                    {
                        this.map[row][column] = 0;
                        enemies.push(new Enemy( column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this))
                    }
                }
            }

            return enemies;
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

        eatDot(x, y)
        {
            const row = y / this.tileSize;
            const column = x / this.tileSize;

            if(Number.isInteger(row) && Number.isInteger(column) )
            {
                if(this.map[row][column] === 0)
                {
                    this.map[row][column] = 5;
                    return true;
                }
            }
            return false;
        }

        eatPowerDot(x, y)
        {
            const row = y / this.tileSize;
            const column = x / this.tileSize;

            if(Number.isInteger(row) && Number.isInteger(column) )
            {
                const tile = this.map[row][column];

                if(tile=== 7)
                {
                    this.map[row][column] = 5;
                    return true;
                }
            }
            return false;
        }

        didWin() 
        {
            return this.#dotsLeft() === 0;
        }

        #dotsLeft() 
        {
            return this.map.flat().filter(tile => tile === 0).length;
        }
}