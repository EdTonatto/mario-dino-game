class Mario {
    WALK_ANIMATION_TIMER = 200;
    walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    dinoRunImages = [];

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

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
        this.yStandingPosition = this.y;

        this.marioJumpImage = new Image();
        this.marioJumpImage.src = './images/mario-jump.png';

        this.aliveMarioImage = new Image();
        this.aliveMarioImage.src = './images/mario-stand-still.png';
        this.image = this.aliveMarioImage;

        const marioRunImage1 = new Image();
        marioRunImage1.src = './images/mario-run-1.png';

        const marioRunImage2 = new Image();
        marioRunImage2.src = './images/mario-run-2.png';

        this.dinoRunImages.push(marioRunImage1);
        this.dinoRunImages.push(marioRunImage2);

        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);        
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);

        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchend', this.touchend);
        window.addEventListener('touchstart', this.touchstart);
        window.addEventListener('touchend', this.touchend);

    }

    keydown = (event) => {
        if(event.code === 'Space') {
            this.jumpPressed = true;
        }
    }

    keyup = (event) => {
        if(event.code === 'Space') {
            this.jumpPressed = false;
        }
    }

    touchstart = () => {
        this.jumpPressed = true;
    }

    touchend = () => {
        this.jumpPressed = false;
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

    jump(frameTimeDelta) {
        if(this.jumpPressed){
            this.jumpInProgress = true;
        }

        if(this.jumpInProgress && !this.falling) {
            if(this.y > this.canvas.height - this.minJumpHeight || this.y > this.canvas.height - this.maxJumpHeight && this.jumpPressed) {
                this.y -= this.JUMP_SPEED * frameTimeDelta * this.scaleRatio;
            } else {
                this.falling = true;
            }
        } else {
            if(this.y < this.yStandingPosition) {
                this.y += this.GRAVITY * frameTimeDelta * this.scaleRatio;
                if(this.y + this.height > this.canvas.height) {
                    this.y = this.yStandingPosition
                }
            } else {
                this.falling = false;
                this.jumpInProgress = false;
            }
        }
    }

    update(gameSpeed, frameTimeDelta) {
        this.run(gameSpeed, frameTimeDelta);

        if(this.jumpInProgress){
            this.image = this.marioJumpImage;
        }

        this.jump(frameTimeDelta);
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Ground{
    constructor(ctx, width, height, speed, scaleRatio){
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.x = 0;
        this.y = this.canvas.height - this.height;

        this.groundImage = new Image();
        this.groundImage.src = './images/ground.png';
    }

    draw() {
        this.ctx.drawImage(this.groundImage, this.x, this.y, this.width, this.height);
        this.ctx.drawImage(this.groundImage, this.x + this.width, this.y, this.width, this.height);

        if(this.x < -this.width) {
            this.x = 0;
        }
    }

    update(gameSpeed, frameTimeDelta) {
        this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
    }

    reset(){
        this.x = 0;
    }
}

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
        this.cloudImage.src = './images/clouds.png';
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
        this.x -= gameSpeed * frameTimeDelta * (this.speed / 2.5) * this.scaleRatio;
    }

    reset(){
        this.x = this.canvas.width;
    }
}

class Obstacle {
    constructor(ctx, x, y, width, height, image) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
    }
  
    update(speed, gameSpeed, frameTimeDelta, scaleRatio) {
        this.x -= speed * gameSpeed * frameTimeDelta * scaleRatio;
    }
  
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWith(sprite) {
        const adjustBy = 1.2;
        if(
            sprite.x < this.x + this.width / adjustBy &&
            sprite.x + sprite.width / adjustBy > this.x &&
            sprite.y < this.y + this.height / adjustBy &&
            sprite.height + sprite.y / adjustBy > this.y
        ){
            return true;
        } else {
            return false
        }
    }
}

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
        const index = this.getRandomNumber(0, this.obstacleImages.length);
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

    collideWith(sprite){
        return this.obstacle.some((obstacle) => obstacle.collideWith(sprite));
    }

    reset(){
        this.obstacle = [];
    }
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const GAME_SPEED_START = 0.75;
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const MARIO_WIDTH = 50;
const MARIO_HEIGHT = 80;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 1250;
const GROUND_HEIGHT = 13;
const CLOUD_WIDTH = 1151 / 5;
const CLOUD_HEIGHT = 531 / 5;
const GROUND_PIPES_CLOUD_SPEED = 0.5;
const OBSTACLE_CONFIG = [
    {width: 40, height: 45, image: './images/pipe.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: './images/goomba.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: './images/green-koopa-shell.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: './images/red-koopa-shell.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: './images/spike.png'},
    {width: 32 * 1.66, height: 16 * 1.66, image: './images/spike-2.png'},
];


let mario = null;
let ground = null;
let cloud = null;
let obstacleController = null;
let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingStart = true;

function getScaleRatio() {
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight,
    );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth,
    );

    if(screenWidth/screenHeight < GAME_WIDTH/GAME_HEIGHT) {
        return screenWidth/GAME_WIDTH;
    } else {
        return screenHeight/GAME_HEIGHT;
    }
}

function createSprites() {
    const marioWidthInGame = MARIO_WIDTH * scaleRatio;
    const marioHeightInGame = MARIO_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    const groundWidthInGame = GROUND_WIDTH * scaleRatio;
    const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

    const cloudWidthInGame = CLOUD_WIDTH * scaleRatio;
    const cloudHeightInGame = CLOUD_HEIGHT * scaleRatio;

    cloud = new Cloud(ctx, cloudWidthInGame, cloudHeightInGame, GROUND_PIPES_CLOUD_SPEED, scaleRatio)
    ground = new Ground(ctx, groundWidthInGame, groundHeightInGame, GROUND_PIPES_CLOUD_SPEED, scaleRatio);
    const obstacleImages = OBSTACLE_CONFIG.map((obstacle) => {
        const image = new Image();
        image.src = obstacle.image;
        return {
            image: image,
            width: obstacle.width * scaleRatio,
            height: obstacle.height * scaleRatio,
        };
    });
    obstacleController = new ObstacleController(ctx, obstacleImages, GROUND_PIPES_CLOUD_SPEED, scaleRatio);
    mario = new Mario(ctx, marioWidthInGame, marioHeightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
}

function setScreen() {
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();

window.addEventListener('resize', () => setTimeout(setScreen, 500));
if(screen.orientation)
    screen.orientation.addEventListener('change', setScreen);

function clearScreen() {
    const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, '#87CEEB');
    grd.addColorStop(1, '#E0F6FF');

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function reset(){
    hasAddedEventListenersForRestart = false;
    gameOver = false;
    waitingStart = false;
    cloud.reset();
    ground.reset();
    obstacleController.reset();
    gameSpeed = GAME_SPEED_START;
}

function setupGameReset() {
    if(!hasAddedEventListenersForRestart){
        hasAddedEventListenersForRestart = true;
        
        setTimeout(() => {
            window.addEventListener('keyup', reset, { once: true });
            window.addEventListener('touchstart', reset, { once: true });
        }, 1000)
    }
}

function showGameOver() {
    const fontSize = 70 * scaleRatio;
    
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;ctx.font = `${fontSize}px Verdana`;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 5;
    ctx.strokeText("GAME OVER", x, y);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ebebeb';
    ctx.fillText("GAME OVER", x, y);
}

function updateGameSpeed(frameTimeDelta) {
    gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

function showStartGame(){
    const fontSize = 30 * scaleRatio;
    
    const x = canvas.width / 20;
    const y = canvas.height / 2;ctx.font = `${fontSize}px Verdana`;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 5;
    ctx.strokeText("TAP SCREEN OR PRESS SPACE TO START GAME", x, y);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ebebeb';
    ctx.fillText("TAP SCREEN OR PRESS SPACE TO START GAME", x, y);
}

function gameLoop(currentTime) {
    if(previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;    
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    
    clearScreen();

    if(!gameOver && !waitingStart){
        cloud.update(gameSpeed, frameTimeDelta);
        ground.update(gameSpeed, frameTimeDelta);
        obstacleController.update(gameSpeed, frameTimeDelta);
        mario.update(gameSpeed, frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
    }
 
    if(!gameOver && obstacleController.collideWith(mario)){
        gameOver = true;
        setupGameReset();
    }

    cloud.draw();
    ground.draw();
    obstacleController.draw();
    mario.draw();

    if(gameOver){
        showGameOver();
    }

    if(waitingStart){
        showStartGame();
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener('keyup', reset, { once: true });
window.addEventListener('touchstart', reset, { once: true });