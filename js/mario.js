class Mario {
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    dinoRunImages = [];

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

        const marioRunImage1 = new Image();
        marioRunImage1.src = '../images/mario-run-1.png';

        const marioRunImage2 = new Image();
        marioRunImage2.src = '../images/mario-run-2.png';

        this.dinoRunImages.push(marioRunImage1);
        this.dinoRunImages.push(marioRunImage2);
    }

    run(gameSpeed, frameTimeDelta) {
        if(this.walkAnimationTimer <= 0) {
            if(this.image === this.dinoRunImages[0]) {
                this.image = this.dinoRunImages[1];
            } else {
                this.image = this.dinoRunImages[0];
            }
            this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
        }
        this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
    }

    update(gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta)
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export { Mario }