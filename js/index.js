import { Mario } from './mario.js';
import { Ground } from './ground.js';
import { Cloud } from './cloud.js';
import { ObstacleController } from './obstaclecontroller.js';

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
    {width: 40, height: 45, image: '../images/pipe.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: '../images/goomba.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: '../images/green-koopa-shell.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: '../images/red-koopa-shell.png'},
    {width: 16 * 1.66, height: 16 * 1.66, image: '../images/spike.png'},
    {width: 32 * 1.66, height: 16 * 1.66, image: '../images/spike-2.png'},
];


let mario = null;
let ground = null;
let cloud = null;
let obstacleController = null;
let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;

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

function gameLoop(currentTime) {
    if(previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;    
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    
    clearScreen();

    cloud.update(gameSpeed, frameTimeDelta);
    ground.update(gameSpeed, frameTimeDelta);
    obstacleController.update(gameSpeed, frameTimeDelta);
    mario.update(gameSpeed, frameTimeDelta);
 
    cloud.draw();
    ground.draw();
    obstacleController.draw();
    mario.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);