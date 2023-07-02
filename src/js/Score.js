export class Score {
    digits = [
        {sx:496 , sy: 60},
        {sx:136 , sy: 455},
        {sx:292 , sy: 160},
        {sx:306 , sy: 160},
        {sx:320 , sy: 160},
        {sx:334 , sy: 160},
        {sx:292 , sy: 184},
        {sx:306 , sy: 184},
        {sx:320 , sy: 184},
        {sx:334 , sy: 184},
    ]
    constructor(game, image, scale) {
        this.game = game;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        this.image = image;
        this.width = 12;
        this.height = 18;
        this.scale = scale;
        this.y = this.game.canvas.height / 10;
    }

    update() {}

    draw() {
        const str = this.game.score.toString();
        for ( let i=0; i<str.length; i++ ) {
            const v = parseInt(str[i]);
            this.ctx.drawImage(
                this.image,
                this.digits[v].sx,
                this.digits[v].sy,
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