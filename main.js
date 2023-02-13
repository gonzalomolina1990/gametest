let isJumping = false;
let score = 0;
let isFalling = true;
let isPlaying = true;

function start() {
  setTimeout(() => {
    gsap.fromTo("#player", {y: -400, ease: Power2.easeIn}, {y: 0, duration:6, ease: Power2.easeIn});
  }, 100);

  setInterval(() => {
    if (document.getElementById('player').style.transform === "translate(0px, 0px)") {
      isPlaying = false;
      checkPlayerPosition();
    }
  }, 10);
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
  const game = document.getElementById('game');
  const playerPosition = player.getBoundingClientRect();
  const gamePosition = game.getBoundingClientRect();

  if (document.getElementById('player').style.transform === "translate(0px, 0px)") {
    isPlaying = false;
    gsap.to("#player", {scale: 0, duration: 0.2, ease: Power2.easeIn, onComplete: function name(params) {
      player.style.display = "none";
    }});
   
    document.querySelector("#text").innerHTML = "You lost! Your score was " + score;

    setTimeout(() => {
      window.location.reload();
    }, 3000);

  } else if (isFalling) {
    gsap.to("#player", {y: "+=10px", duration: 0.1, ease: Power2.easeIn});
    setTimeout(checkPlayerPosition, 100);
  }
}

setTimeout(() => {
    const player = document.getElementById('player');
    if (isPlaying) {
      player.addEventListener('click', jump);
      player.addEventListener('touchstart', jump);
    } 

}, 2000);

start();
