import { BirdPlayer } from "./BirdPlayer";
import { Game } from "./Game";

export class Population {
    birds: Array<BirdPlayer> = [];
    generation: number = 1;

    constructor(game: Game, size: number) {
        for (let i=0; i<size; i++ ) {
            this.birds.push(
                new BirdPlayer(game, {
                    jumpFrequency: this.rnd(10, 500),
                    distances: {
                        x: this.rnd(-250, 250),
                        top: this.rnd(-250, 250),
                        bottom: this.rnd(-250, 250),
                        jumpHeight: this.rnd(-250, 250)
                    }
                })
            );
        }
    }

    jump() {
        for ( const bird of this.birds ) {
            bird.jump();
        }
    }

    update(frameAdjustment:number, deltaTime: number) {
        for ( const bird of this.birds ) {
            if ( !bird.collided() ) {
                bird.update(frameAdjustment, deltaTime);
            }
        }
    }

    draw() {
        for ( const bird of this.birds ) {
            bird.draw();
        }
    }

    rnd(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}