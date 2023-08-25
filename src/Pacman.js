import MovingDirection from "./MovingDirection.js";

export default class Pacman 
{
    constructor(x, y, tileSize, velocity, tileMap)
    {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestMovingDirection = null;

        document.addEventListener("keydown", this.#keydown);

        this.#loadPacmanImages();

    }

    draw(context) 
    {
        this.#move();
        context.drawImage(
                this.pacmanImages[this.pacmanImageIndex],
                this.x,
                this.y, 
                this.tileSize, 
                this.tileSize
            )
    }

    #loadPacmanImages()
    {
        const pacmanImage1 = new Image();
        pacmanImage1.src = "../images/pac0.png";

        const pacmanImage2 = new Image();
        pacmanImage2.src = "../images/pac1.png";

        const pacmanImage3 = new Image();
        pacmanImage3.src = "../images/pac2.png";

        const pacmanImage4 = new Image();
        pacmanImage4.src = "../images/pac1.png";

        this.pacmanImages = 
        [
            pacmanImage1,
            pacmanImage2, 
            pacmanImage3, 
            pacmanImage4
        ];

        this.pacmanImageIndex = 0;
    }

    #keydown = (event) => {
        // up
        if(event.keyCode == 38 || event.keyCode == 87) 
        {
            if(this.currentMovingDirection == MovingDirection.down)

                this.currentMovingDirection = MovingDirection.up;
                this.requestMovingDirection = MovingDirection.up;
        }
        // down
        if(event.keyCode == 40 ||  event.keyCode == 83) 
        {
            if(this.currentMovingDirection == MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
                this.requestMovingDirection = MovingDirection.down;
        }
        // left
        if(event.keyCode == 37 ||  event.keyCode == 65) 
        {
            if(this.currentMovingDirection == MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
                this.requestMovingDirection = MovingDirection.left;
        }
        // right        
        if(event.keyCode == 39 ||  event.keyCode == 68) 
        {
            if(this.currentMovingDirection == MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
                this.requestMovingDirection = MovingDirection.right;
        }

    }

    #move()
    {
        if(this.currentMovingDirection !== this.MovingDirection)
        {
            if(
                Number.isInteger( this.x / this.tileSize ) && 
                Number.isInteger(this.y / this.tileSize)
                )
                {
                    this.currentMovingDirection = this.requestMovingDirection
                }
        }

        switch(this.currentMovingDirection)
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