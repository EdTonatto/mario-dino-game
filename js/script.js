// const mario = document.querySelector('.mario');
// const pipe = document.querySelector('.pipe');

// const jump = () => {
//     mario.classList.add('jump');
//     setTimeout(() => {
//         mario.classList.remove('jump');
//     }, 500);
// };

// const loop = setInterval(() => {
//     const pipeLeftPosition = pipe.offsetLeft;
//     const marioBottomPosition = Number(window.getComputedStyle(mario).bottom.replace('px', ''));

//     if(pipeLeftPosition > 0 && pipeLeftPosition <= 70 && marioBottomPosition <= 60) {
//         pipe.style.animation = 'none';
//         pipe.style.left = `${pipeLeftPosition}px`;

//         mario.style.animation = 'none';
//         mario.style.bottom = `${marioBottomPosition}px`;
//         mario.src = './images/game-over.png'
//         mario.style.width = '60px';
//         mario.style.marginLeft = '20px';

//         clearInterval(loop);
//     }
// }, 10)

// document.addEventListener('keydown', jump);
// document.addEventListener('touchstart', jump);