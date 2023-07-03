import { Game } from "./Game";

class App {
    game: Game;
    previousTime: number = 0; 

    constructor() {
        this.game = new Game( document.getElementById('game') as HTMLCanvasElement );
        this.run(0);
    }

    run( currentTime: number ) {
        let frameTime: number = currentTime - this.previousTime;
        this.previousTime = currentTime;
        this.game.update(frameTime);
        this.game.draw();
        requestAnimationFrame(this.run.bind(this));
    }
}

new App();

/*const flappyBird: Game = new Game( document.getElementById('game') as HTMLCanvasElement );

let previousTime: number = 0; 
function run( currentTime: number ): void {
    let frameTime: number = currentTime - previousTime;
    previousTime = currentTime;
    flappyBird.update(frameTime);
    flappyBird.draw();
    requestAnimationFrame(run);
}

run(0);*/