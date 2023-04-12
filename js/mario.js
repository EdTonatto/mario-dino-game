class Mario {
    constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJumpHeight = minJumpHeight;
        this.maxJumpHeight = maxJumpHeight;
        this.scaleRatio = scaleRatio;

        this.x = 15 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;

        this.aliveMarioImage = new Image();
        this.aliveMarioImage.src = '../images/mario-stand-still.png';
        this.image = this.aliveMarioImage;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export { Mario }