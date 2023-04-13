class Cloud{
    constructor(ctx, width, height, speed, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.x = this.canvas.width;
        this.y = 25;

        this.cloudImage = new Image();
        this.cloudImage.src = '../images/clouds.png';
    }

    draw() {
        this.ctx.drawImage(this.cloudImage, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.cloudImage, this.x + this.width * 1.66, this.y, this.width, this.height);

        if(this.x + this.width * 2 < -this.width) {
            this.x = this.canvas.width;
            this.y = Math.floor(Math.random() * (30 - 5) + 5);
        }
    }

    update(gameSpeed, frameTimeDelta) {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
    }
}

export { Cloud };