let isJumping = false;
let score = 0;
let isFalling = true;

function start() {
  setTimeout(() => {
    gsap.fromTo("#player", {y: -500, ease: Power2.easeIn}, {y: 0, duration:1, ease: Power2.easeIn});
  }, 100);
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    isFalling = false;

    gsap.to("#player", {y: "-=200px", duration:2, ease: Power2.easeOut});

    setTimeout(() => {
        gsap.to("#player", {y: 0, duration: 1, ease: Power2.easeIn});
        isJumping = false;
        isFalling = true;
        score += 1;
        updateScore();
    }, 2000);
  } 
}

function updateScore() {
  document.querySelector('.score').innerHTML = "Score: " + score;
}

function checkPlayerPosition() {
  const player = document.getElementById('player');
  const playerBottom = player.getBoundingClientRect().bottom;
  const game = document.getElementById('game');
  const gameBottom = game.getBoundingClientRect().bottom;

  if (playerBottom >= gameBottom) {
    alert("You lost! Your score was " + score);
  } else if (isFalling) {
    gsap.to("#player", {y: "+=10px", duration: 0.1, ease: Power2.easeIn});
    setTimeout(checkPlayerPosition, 100);
  }
}

setTimeout(() => {
    const player = document.getElementById('player');
    player.addEventListener('click', jump);
    player.addEventListener('touchstart', jump);

}, 2000);

start();
