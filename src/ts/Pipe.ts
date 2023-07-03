import { Game } from "./Game";

export class Pipe {
    score: boolean = false;
    x: number = 0;
    y: number = 0;
    width: number = 26;
    height: number = 160;
    gap: number = 65;

    private sx: number = 56;
    private sy: number = 323;
    private ctx: CanvasRenderingContext2D|null;
    private canvas: HTMLCanvasElement;
    private image: CanvasImageSource;
    private offset: number;
    private scale: number;
    private speed: number;
    
    constructor(game: Game, image: CanvasImageSource, scale: number, speed: number, offset: number) {
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        this.image = image;
        this.offset = offset;
        this.scale = scale;
        this.speed = speed;
        this.gap = this.gap * this.scale;
        this.reset();
    }

    reset() {
        this.x = this.canvas.width * this.offset + (this.width * this.scale) * (this.offset - 1);
        this.y =  (Math.random() * (this.canvas.height*0.6 - this.canvas.height*0.2) + this.canvas.height*0.1) - this.height * this.scale;
        this.offset = 1;
        this.score = true;
    }

    update( frameAdjustment:number ) {
        this.x -= this.speed * frameAdjustment;
        if ( this.x + this.width * this.scale < 0 ) {
            this.reset();
        }
    }

    draw() {
        this.ctx?.drawImage(
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

        this.ctx?.drawImage(
            this.image,
            this.sx + 28 ,
            this.sy,
            this.width,
            this.height,
            this.x,
            this.y + this.gap + this.height * this.scale,
            this.width * this.scale,
            this.height * this.scale,
        );
    }
}