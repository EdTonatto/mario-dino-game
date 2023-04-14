import { Obstacle } from "../js/Obstacle.js";

class ObstacleController {
    OBSTACLE_INTERVAL_MIN = 500;
    OBSTACLE_INTERVAL_MAX = 2000;

    nextObstacleInterval = null;
    obstacle = [];

    constructor(ctx, obstacleImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.obstacleImages = obstacleImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextObstacleTime();
    }

    setNextObstacleTime() {
        const num = this.getRandomNumber(
        this.OBSTACLE_INTERVAL_MIN,
        this.OBSTACLE_INTERVAL_MAX
        );

        this.nextObstacleInterval = num;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    createObstacle() {
        const index = this.getRandomNumber(0, this.obstacleImages.length - 1);
        const obstacleImage = this.obstacleImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - obstacleImage.height;
        const obstacle = new Obstacle(this.ctx, x, y, obstacleImage.width, obstacleImage.height, obstacleImage.image);

        this.obstacle.push(obstacle);
    }

    update(gameSpeed, frameTimeDelta) {
        if (this.nextObstacleInterval <= 0) {
            this.createObstacle();
            this.setNextObstacleTime();
        }
        this.nextObstacleInterval -= frameTimeDelta;

        this.obstacle.forEach((obstacle) => {
            obstacle.update(this.speed, gameSpeed, frameTimeDelta, this.scaleRatio);
        });

        this.obstacle = this.obstacle.filter((obstacle) => obstacle.x > -obstacle.width);
    }

    draw() {
        this.obstacle.forEach((obstacle) => obstacle.draw());
    }
}

export { ObstacleController };