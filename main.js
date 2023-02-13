let isJumping = false;
let score = 0;
let isFalling = true;
let isPlaying = true;
let gravity = 400;

function start() {
  setTimeout(() => {
    gsap.to("#player", {bottom: "-432px", duration:6, ease: Power2.easeIn});
  }, 100);
  

  setInterval(() => {
    if (document.getElementById('player').style.bottom === "-20px" || document.getElementById('player').style.bottom === "-432px") {
      isPlaying = false;
      checkPlayerPosition();
    }
  }, 10);
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    isFalling = false;

    gsap.to("#player", {bottom: "+=200px", duration:2, ease: Power2.easeOut});

    setTimeout(() => {
        gsap.to("#player", {bottom: "-432px", duration: 4, ease: Power2.easeIn});
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
  const playerPosition = parseInt(player.style.bottom);

  if (playerPosition <= -430 || playerPosition >= -20) {
    isPlaying = false;
    gsap.to("#player", {scale: 0, duration: 0.2, ease: Power2.easeIn, onComplete: ()=> {
      player.style.display = "none";
    }});
   
    document.querySelector("#text").innerHTML = "You lost! Your score was " + score;

    setTimeout(() => {
      window.location.reload();
    }, 3000);

  } else if (isFalling) {
    gsap.to("#player", {bottom: -432, duration: 5, ease: Power2.easeIn});
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
