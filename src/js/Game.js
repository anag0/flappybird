import { Layer } from "./Layer.js";
import { Bird } from "./Bird.js";
import { Input } from "./Input.js"; 
import { Pipe } from "./Pipe.js";
import { Score } from "./Score.js";

export class Game {
    scale = 3;
    gravity = 0.0008; // relative to the height pull
    started = false;
    speed = 1.8;
    score = 0;

    constructor( canvas ) {
        const sprite = document.getElementById('sprite');
 
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 144;
        this.height = 256;
        canvas.width = 144 * this.scale;
        canvas.height = 256 * this.scale;

        this.input = new Input();

        // Background
        this.bgLayer = new Layer(
            this.ctx,
            sprite,
            0, 0, 0, 0, 144, 256, this.scale, 0.05
        );

        this.pipes = [
            new Pipe(this, sprite, this.scale, this.speed, 1),
            new Pipe(this, sprite, this.scale, this.speed, 1.5)
        ];

        // Bottom
        this.bottomLayer = new Layer(
            this.ctx,
            sprite,
            0, (this.height - 56)* this.scale, 292, 0, 144, 56, this.scale, this.speed
        );

        // Bird
        this.bird = new Bird(this, sprite, this.scale, this.gravity);

        // Score
        this.scoreObj = new Score(this, sprite, this.scale);
    }

    update(frameTime) {
        if ( !this.started && this.input.didClick() ) {
            this.started = true;
            this.bird.jump();
        }
        if ( !this.bird.collided() ) {
            if ( this.started ) {
                this.bgLayer.update();
                this.bottomLayer.update();
            }
            this.bird.update(frameTime, this.input);
            if ( this.started ) {
                for ( const pipe of this.pipes ) {
                    pipe.update();
                }
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bgLayer.draw();
        for ( const pipe of this.pipes ) {
            pipe.draw();
        }
        this.bottomLayer.draw();
        this.bird.draw();
        this.scoreObj.draw();
    }
}