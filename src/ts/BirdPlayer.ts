import { Bird } from "./Bird";
import { Game } from "./Game";

type PipeDistances = {
    x: number, // next pipe distance
    top: number,  // next top pipe vertical distance
    bottom: number  // next bottom pipe vertical distance 
    jumpHeight: number // jump height guess
}

type BirdPlayerArgs = {
    jumpFrequency: number,
    distances: PipeDistances
};

export class BirdPlayer extends Bird {
    jumpFrequency: number;
    distances: PipeDistances;
    lastJump: number = 0;


    constructor(game: Game, args: BirdPlayerArgs) {
        super(game);
        this.jumpFrequency = args.jumpFrequency;
        this.distances = args.distances;
    }

    shouldJump() {
        let pipe = this.game.pipes[0];
        let closestDistance = 1000;

        for ( const p of this.game.pipes ) {
            if ( Math.abs((p.x - p.width * this.scale) - this.x) < closestDistance ) {
                closestDistance = Math.abs(p.x - this.x);
                pipe = p;
            }
        }
  
        // Just above ground
        if ( this.y + this.height * this.scale > (200 * this.scale) - 20 ) {
            return true;
        }

        const nexPipeDistance = pipe.x - this.x;
        const nextTopPipeDistance = this.y - (pipe.y + (pipe.height *this.scale));
        const nextBottomPipeDistance = (pipe.y + (pipe.height *this.scale) + pipe.gap) - this.y;

        if ( 
            nexPipeDistance < this.distances.x && (
                this.distances.top < nextTopPipeDistance ||
                this.distances.bottom < nextBottomPipeDistance
            ) && nextTopPipeDistance > this.distances.jumpHeight
        ) {
            return true;
        }

        return false;
    }

    update( frameAdjustment:number, deltaTime: number): void {
        this.deltaTime += deltaTime;
        this.lastJump += deltaTime;
        this.lastScored += deltaTime;

        // Bird flapping animation
        if ( this.deltaTime > 180 ) {
            this.deltaTime = 0;
            this.sx = this.sx >= 51 ? 3 : this.sx + 28; 
        }

        if ( this.shouldJump() && this.lastJump > this.jumpFrequency ) {
            this.lastJump = 0;
            this.jump();
        }

        if ( this.state == "jumping" ) {
            let speed = this.canvas.height * this.gravity * ( frameAdjustment / 2 );
            this.gy -= speed;
            this.y -= this.gy * frameAdjustment;
            this.gy -= speed;
        }
    }
}