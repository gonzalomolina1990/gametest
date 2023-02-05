const player = document.querySelector('.player');
let isJumping = false;

function jump() {
  if (!isJumping) {
    isJumping = true;
    player.style.bottom = '200px';
    setTimeout(() => {
      player.style.bottom = '0';
      isJumping = false;
    }, 500);
  }
}

player.addEventListener('click', jump);
