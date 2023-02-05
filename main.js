let isJumping = false;

function jump() {
  if (!isJumping) {
    isJumping = true;

    gsap.to("#player", {y: "-=200px", duration:2, ease: Power2.easeOut});

    setTimeout(() => {
        gsap.to("#player", {y: 0, duration: 1, ease: Power2.easeIn});
        isJumping = false;

    }, 2000);
  }
}

setTimeout(() => {
    const player = document.getElementById('player');
    player.addEventListener('click', jump);
}, 2000);

console.log(document.querySelector('.player'));

