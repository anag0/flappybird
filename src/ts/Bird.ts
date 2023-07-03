import { Game } from "./Game";
import { Input } from "./Input";

enum BirdStates {
    jumping = "jumping",
    falling = "falling"
}

export class Bird {
    private sx: number = 3;
    private sy: number = 491;
    private width: number = 17;
    private height: number = 12;
    private gy: number = 0;
    private frameTime: number = 1;

    private game: Game;
    private ctx: CanvasRenderingContext2D|null;
    private canvas: HTMLCanvasElement;
    private image: CanvasImageSource;
    private x: number;
    private y: number;
    private scale: number;
    private gravity: number;

    private flapSound: HTMLAudioElement;
    private scoreSound: HTMLAudioElement;

    private state = BirdStates.falling;


    constructor(game: Game, image: CanvasImageSource, scale: number, gravity: number) {
        this.game = game;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        this.image = image;
        this.scale = scale;
        this.x = (this.canvas.width  - this.width * scale) / 2;
        this.y = (this.canvas.height  - this.height * scale) / 2;
        this.gravity = gravity;
        this.flapSound = new Audio("./sounds/fly.mp3");
        this.scoreSound = new Audio("./sounds/score.mp3");
    }

    update( frameAdjustment:number, frameTime: number, input: Input ): void {
        this.frameTime = this.frameTime + frameTime;
        if ( this.frameTime > 180 ) {
            this.frameTime = 0;
            this.sx = this.sx >= 51 ? 3 : this.sx + 28; 
        }
 
        if ( input.didClick() ) {
            this.jump();
        }

        if ( this.state == "jumping" ) {
            this.gy = this.gy - (this.canvas.height * this.gravity * frameAdjustment);
            this.y -= this.gy * frameAdjustment;
        }
    }

    jump() {
        this.state = BirdStates.jumping;
        this.gy = this.canvas.height / 70;
        this.flapSound.play();
        this.flapSound.currentTime = 0;
    }

    collided(): boolean {
        // Pipes
        for ( const pipe of this.game.pipes ) {
            const left = this.x,
                right = this.x + (this.width*this.scale),
                top = this.y,
                bottom = this.y + (this.height*this.scale);
            // Pipe X overlapping    
            if ( pipe.x < right - 3 && (pipe.x + pipe.width*this.scale) - 5 > left ) {
                if ( 
                    top < pipe.y + (pipe.height *this.scale) ||
                    bottom > ( pipe.y + (pipe.height *this.scale) + pipe.gap )
                ) {
                    return true;
                }
            } else if ( (pipe.x + pipe.width*this.scale) - 5 < left ) {
                if ( pipe.score ) {
                    this.game.score++;
                    pipe.score = false;
                    this.scoreSound.play();
                }
            }   
        }

        // Floor
        if ( this.y + this.height * this.scale > 200 * this.scale ) {
            return true;
        }

        return false;
    }

    draw(): void {
        const ctx = this.ctx;

        if ( ctx != null ) {
            ctx.save();
            ctx.translate(this.x + (this.width * this.scale)/2, this.y + (this.height * this.scale)/2);
            ctx.rotate(-this.gy * 2 * Math.PI/180.0);
            ctx.translate(-this.x - (this.width * this.scale)/2, -this.y - (this.height * this.scale)/2);

            ctx.drawImage(
                this.image,
                this.sx,
                this.sy,
                this.width,
                this.height, 
                this.x,
                this.y,
                this.width * this.scale,
                this.height * this.scale,
            );

            ctx.restore();
        }
    }
}