import { Game } from "./Game";
import { Input } from "./Input";
import { Pipe } from "./Pipe";
import FlapSound from "./../../sounds/fly.mp3";
import ScoreSound from "./../../sounds/score.mp3";
import HitSound from "./../../sounds/hit.mp3";

enum BirdStates {
    jumping = "jumping",
    falling = "falling"
}

export class Bird {
    score: number = 0;
    protected lastScored: number = 0;
    protected sx: number = 3;
    protected sy: number = 491;
    protected width: number = 17;
    protected height: number = 12;
    protected gy: number = 0;
    protected deltaTime: number = 1;

    protected game: Game;
    protected ctx: CanvasRenderingContext2D|null;
    protected canvas: HTMLCanvasElement;
    protected image: CanvasImageSource;
    protected x: number;
    protected y: number;
    protected scale: number;
    protected gravity: number;
    protected jumpHeight: number;

    protected flapSound: HTMLAudioElement;
    protected scoreSound: HTMLAudioElement;
    protected hitSound: HTMLAudioElement;

    protected state = BirdStates.falling;


    constructor(game: Game) {
        this.game = game;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        this.image = game.sprite;
        this.scale = game.scale;
        this.x = (this.canvas.width  - this.width * game.scale) / 2;
        this.y = (this.canvas.height  - this.height * game.scale) / 2;
        this.gravity = game.gravity;
        this.jumpHeight = (this.canvas.height / 70) * this.canvas.height * this.gravity * 30 ;
        //this.flapSound = new Audio("./sounds/fly.mp3");
        //this.flapSound = new Audio(new URL("./../../sounds/fly.mp3", import.meta.url).href);
        this.flapSound = new Audio(FlapSound);
        //this.scoreSound = new Audio("./sounds/score.mp3");
        //this.scoreSound = new Audio(new URL("./../../sounds/score.mp3", import.meta.url).href);
        this.scoreSound = new Audio(ScoreSound);
        //this.hitSound = new Audio("./sounds/hit.mp3");
        //this.hitSound = new Audio(new URL("./../../sounds/hit.mp3", import.meta.url).href);
        this.hitSound = new Audio(HitSound);
        
    }

    update( frameAdjustment:number, deltaTime: number, input: Input ): void {
        this.deltaTime = this.deltaTime + deltaTime;
        this.lastScored += deltaTime;

        // Bird flapping animation
        if ( this.deltaTime > 180 ) {
            this.deltaTime = 0;
            this.sx = this.sx >= 51 ? 3 : this.sx + 28; 
        }
 
        if ( input.didClick() ) {
            this.jump();
        }

        if ( this.state == "jumping" ) {
            let speed = this.canvas.height * this.gravity * ( frameAdjustment / 2 );
            /**
             * What's this abomination? Why apply half of the speed twice?
             * It is to counteract linear acceleration on different FPS.
             * Watch this video: https://www.youtube.com/watch?v=yGhfUcPjXuE
             */
            this.gy -= speed;
            this.y -= this.gy * frameAdjustment;
            this.gy -= speed;
        }
    }

    jump() {
        this.state = BirdStates.jumping;
        this.gy = this.canvas.height / 70;
        this.flapSound.play();
        this.flapSound.currentTime = 0;
    }

    collided(): boolean {
        //return false;
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
                    this.hitSound.play();
                    return true;
                }
            } else if ( 
                (pipe.x + pipe.width*this.scale) - 5 < left &&
                (pipe.x + pipe.width*this.scale) > left
            ) {
                this.scored();
            }   
        }

        // Floor
        if ( this.y + this.height * this.scale > 200 * this.scale ) {
            this.hitSound.play();
            return true;
        }

        return false;
    }

    scored(): void {
        if ( this.lastScored > ( 1000 / this.game.speed ) ) {
            this.score++;
            this.lastScored = 0;
        }
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