import { Game } from "./Game";

type Coordinates = {
    x: number,
    y: number
}
type CoordinatesArray = Array<Coordinates>

export class Score {
    x: number = 0;
    y: number = 0;
    width: number = 12;
    height: number = 18;

    private game: Game;
    private ctx: CanvasRenderingContext2D|null;
    private image: CanvasImageSource;
    private scale: number;

    private digits: CoordinatesArray = [
        {x:496 , y: 60},
        {x:136 , y: 455},
        {x:292 , y: 160},
        {x:306 , y: 160},
        {x:320 , y: 160},
        {x:334 , y: 160},
        {x:292 , y: 184},
        {x:306 , y: 184},
        {x:320 , y: 184},
        {x:334 , y: 184},
    ]
    constructor(game: Game, image: CanvasImageSource, scale: number) {
        this.game = game;
        this.ctx = game.ctx;
        this.image = image;
        this.scale = scale;
        this.y = this.game.canvas.height / 10;
    }

    update() {}

    draw() {
        const str = this.game.score.toString();
        for ( let i=0; i<str.length; i++ ) {
            const v = parseInt(str[i]);
            this.ctx?.drawImage(
                this.image,
                this.digits[v].x,
                this.digits[v].y,
                this.width,
                this.height,
                (this.game.canvas.width - (this.width * this.scale) * str.length ) / 2 + (this.width * this.scale) * i,
                this.y,
                this.width * this.scale,
                this.height * this.scale,
            );
        }
    }
}