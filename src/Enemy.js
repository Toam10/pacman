import MovingDirection from "./MovingDirection.js";

export default class Enemy 
{

    constructor(x, y, tileSize, velocity, tileMap)
    {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.#loadImages();

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

        this.directionTimerDefault = this.#random(10, 25);
        this.directionTimer = this.directionTimerDefault;

        this.scaredAboutToExpireTimerDefault = 10;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;

    }

    #random(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1 ) ) + min;
    }

    draw( context, pause, pacman )
    {
        if(!pause)
        {
            this.#move();
            this.#changeDirection();
        }

        this.#setImage( context, pacman );
    }

    collideWith( pacman )
    {
        const size = this.tileSize / 2;

        if( 
            this.x < pacman.x + size 
            && (this.x +size > pacman.x ) 
            && (this.y < pacman.y + size) 
            && (this.y +size > pacman.y) 
            )
          {
            return true;
          }
          else
          {
            return false;
          }
    }

    #setImage( context, pacman )
    {
        if( pacman.powerDotActive )
        {
            this.#setImageWhenPowerDotIsActive( pacman );
        }
        else
        {
            this.image = this.orangeGhosts;
        }

        context.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
    }

    #setImageWhenPowerDotIsActive( pacman )
    {
        if(pacman.powerDotAboutToExpire)
        {
            this.scaredAboutToExpireTimer--;
            
            if(this.scaredAboutToExpireTimer === 0)
            {
                this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;

                if(this.image === this.blueGhost)
                {
                    this.image = this.whiteGhost;
                }
                else
                {
                    this.image = this.blueGhost;
                }
            }
        }
        else
        {
            this.image = this.blueGhost;
        }
    }

    
    #move()
    {
        if( !this.tileMap.didCollideWithEnvironment( this.x, this.y, this.movingDirection ) )
        {
            switch(this.movingDirection)
            {
                case MovingDirection.up:
                    this.y -= this.velocity;
                break;
                
                case MovingDirection.down:
                    this.y += this.velocity;
                break;
                
                case MovingDirection.left:
                    this.x -= this.velocity;
                break;
                
                case MovingDirection.right:
                    this.x += this.velocity;
                break;
            }
        }
    }

    #changeDirection()
    {
        this.directionTimer--;

        let newMoveDirection = null;

        if(this.directionTimer == 0)
        {
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length );
        };

        if(newMoveDirection != null && this.movingDirection != newMoveDirection)
        {
            if(Number.isInteger( this.x / this.tileSize ) && Number.isInteger( this.y / this.tileSize ))
            {
                if( !this.tileMap.didCollideWithEnvironment(this.x , this.y , newMoveDirection) )
                {
                    this.movingDirection = newMoveDirection;
                }
            }
        }
    }   


    #loadImages()
    {
        this.orangeGhosts = new Image();
        this.orangeGhosts.src = '../images/orangeGhost.png';

        this.blueGhost = new Image();
        this.blueGhost.src = '../images/blueGhost.png';

        this.whiteGhost = new Image();
        this.whiteGhost.src = '../images/whiteGhost.png';

        this.image = this.orangeGhosts;

    }
}