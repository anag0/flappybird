export class Layer {
    constructor(ctx, image, x, y, sx, sy, width, height, scale, speed) {
        this.ctx = ctx;
        this.image = image;
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.speed = speed;
    }

    update() {
        this.x = this.x <= -(this.width * this.scale) ? 0 : this.x
        this.x -= this.speed;
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
            this.sx,
            this.sy,
            this.width,
            this.height,
            this.x + (this.width * this.scale) - 1,
            this.y,
            this.width * this.scale,
            this.height * this.scale,
        );
    }
}