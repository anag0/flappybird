import { Game } from "./Game.js";

const canvas = document.getElementById('game');
const flappyBird = new Game( canvas );

let previousTime = 0; 
function animate( currentTime ) {
    let frameTime = currentTime - previousTime;
    previousTime = currentTime;
    flappyBird.update(frameTime);
    flappyBird.draw();
    requestAnimationFrame(animate);
}

animate(0);