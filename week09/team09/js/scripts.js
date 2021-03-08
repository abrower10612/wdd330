var keyCount = {
  count : 1
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    key.style.transform = "translateY(-" + 20 * keyCount.count + "%)";
    if (audio) {
      keyCount.count++;
      switch (keyCount.count) {
        case 2:
          key.style.color = "#CAF0F8";
          break;
        case 3:
          key.style.color = "#ADE8F4";
          break;
        case 4:
          key.style.color = "#90E0EF";
          break;
        case 5:
          key.style.color = "#48CAE4";
          break;
        case 6:
          key.style.color = "#00B4D8";
          break;
        case 7:
          key.style.color = "#0096C7";
          break;
        case 8:
          key.style.color = "#0077B6";
          break;
        case 9: 
          key.style.color = "#023E8A";
          break;
        case 10:
          key.style.color = "#03045E";
          break;
        default:
          key.style.color = "#FFFFFF";
          break;
      }
      if (keyCount.count == 10) {
        keyCount.count = 0;
      };
    }

    if(!audio) return; // stop the function from running
    audio.currentTime = 0; // rewind to start of audio file
    audio.play();
    key.classList.add('playing');
}

function removeTransition(e) {
  if(e.propertyName !== 'transform') return; // skip if it's not transform
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);