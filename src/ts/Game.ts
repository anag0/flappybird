import { Layer } from "./Layer";
import { Bird } from "./Bird";
import { Input } from "./Input"; 
import { Pipe } from "./Pipe";
import { Score } from "./Score";


export class Game {
    width: number = 144; // Game Canvas width
    height: number = 256; // Game Canvas height
    scale: number = 2; // Scale (zoom) for width/height
    gravity: number = 0.0008; // relative to the canvas height pull
    started: boolean = false;
    ended: boolean = false;
    startTime: number = 0;
    speed: number = 1.8;
    score: number = 0;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D|null;
    pipes: Array<Pipe>;

    private bird: Bird;
    private input: Input;
    private bgLayer: Layer;
    private bottomLayer: Layer;
    private scoreObj: Score;

    /**
     * Ok, I don't like to multiply by deltaTime, sue me.
     * Instead I expect a 60 framerate and adjust the frames by
     * the actual framerate and expected framerate ratio.
     * It's the same as deltaTime, but you get a lower number.
     */
    private expectedFPS: number = 60;
    private expectedFrameTime: number = 1000/this.expectedFPS;

    constructor( canvas: HTMLCanvasElement ) {
        const sprite = document.getElementById('sprite') as CanvasImageSource;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        canvas.width = this.width * this.scale;
        canvas.height = this.height * this.scale;

        this.input = new Input();

        // Background
        this.bgLayer = new Layer({
            ctx: this.ctx,
            image: sprite,
            x: 0, y: 0, sx: 0, sy: 0, 
            width: this.width, 
            height: this.height, 
            scale: this.scale,
            speed: 0.05
        });

        this.pipes = [
            new Pipe(this, sprite, this.scale, this.speed, 1),
            new Pipe(this, sprite, this.scale, this.speed, 1.5)
        ];

        // Bottom
        this.bottomLayer = new Layer({
            ctx: this.ctx,
            image: sprite,
            x: 0, y: (this.height - 56)* this.scale, sx: 292, sy: 0, 
            width: 144, height: 56, 
            scale: this.scale,
            speed: this.speed
        });

        // Bird
        this.bird = new Bird(this, sprite, this.scale, this.gravity);

        // Score
        this.scoreObj = new Score(this, sprite, this.scale);
    }

    update(deltaTime: number): void {
        // If the FPS is not 60 then the calculations need to be adjusted
        const frameAdjustment = deltaTime / this.expectedFrameTime;

        if ( !this.started && this.input.didClick() ) {
            this.started = true;
            this.startTime = Date.now();
            this.bird.jump();
        }
        if ( !this.ended && !this.bird.collided() ) {
            if ( this.started ) {
                this.bgLayer.update(frameAdjustment);
                this.bottomLayer.update(frameAdjustment);
            }
            this.bird.update(frameAdjustment, deltaTime, this.input);
            if ( this.started ) {
                for ( const pipe of this.pipes ) {
                    pipe.update(frameAdjustment);
                }
            }
        } else if ( !this.ended ) {
            this.ended = true;
            // This is useful for testing at different framerates
            console.log('Game Time: ', (Date.now() - this.startTime)/1000, 's');
        }
    }

    draw(): void {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bgLayer.draw();
        for ( const pipe of this.pipes ) {
            pipe.draw();
        }
        this.bottomLayer.draw();
        this.bird.draw();
        this.scoreObj.draw();
    }
}