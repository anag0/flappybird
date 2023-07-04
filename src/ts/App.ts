import { Game } from "./Game";

class App {
    game: Game;
    previousTime: number = 0; 

    constructor() {
        this.game = new Game( document.getElementById('game') as HTMLCanvasElement );
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

new App();