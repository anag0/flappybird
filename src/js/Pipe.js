export class Pipe {
    constructor(game, image, scale, speed, offset) {
        this.game = game;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
        this.image = image;
        this.offset = offset;
        this.sx = 56;
        this.sy = 323;
        this.width = 26;
        this.height = 160;
        this.scale = scale;
        this.speed = speed;
        this.gap = 65 * this.scale;
        this.reset();
    }

    reset() {
        this.x = this.canvas.width * this.offset + (this.width * this.scale) * (this.offset - 1);
        this.y =  (Math.random() * (this.canvas.height*0.6 - this.canvas.height*0.2) + this.canvas.height*0.1) - this.height * this.scale;
        this.offset = 1;
        this.score = true;
    }

    update() {
        this.x -= this.speed;
        if ( this.x + this.width * this.scale < 0 ) {
            this.reset();
        }
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            this.sx,
            this.sy,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width * this.scale,
            this.height * this.scale,
        );

        this.ctx.drawImage(
            this.image,
            this.sx + 28 ,
            this.sy,
            this.width,
            this.height,
            this.x,
            this.y + this.gap + this.height * this.scale,
            this.width * this.scale,
            this.height * this.scale,
        );
    }
}