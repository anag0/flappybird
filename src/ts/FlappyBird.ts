import { Game } from "./Game";

class FlappyBird {
    game: Game;
    previousTime: number = 0; 

    constructor( canvasID: string) {
        this.game = new Game( document.getElementById(canvasID) as HTMLCanvasElement );
        this.run(0);
    }

    run( currentTime: number ) {
        const deltaTime: number = currentTime - this.previousTime;
        this.previousTime = currentTime;
        this.game.update(deltaTime);
        this.game.draw();
        requestAnimationFrame(this.run.bind(this));
    }
}

export default FlappyBird;