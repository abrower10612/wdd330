var keyCount = {
  A : 0,
  S : 0,
  D : 0,
  F : 0,
  G : 0,
  H : 0,
  J : 0,
  K : 0,
  L : 0
}

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (key == null) return;

    var color = Math.floor(Math.random() * Math.floor(6));

    switch(color) {
      case 0:
        key.style.color = "pink";
      case 1:
        key.style.color = "red";
        break;
      case 2:
        key.style.color = "blue";
        break;
      case 3:
        key.style.color = "orange";
        break;
      case 4:
        key.style.color = "purple";
        break;
      case 5:
        key.style.color = "green";
    }

    if(key.id === "65") {
      keyCount.A++;
      key.style.transform = "translateY(-" + 20 * keyCount.A + "%)";
      if (keyCount.A == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.A = 0;
      };
    }

    else if (key.id === "83") {
      keyCount.S++;
      key.style.transform = "translateY(-" + 20 * keyCount.S + "%)";
      if (keyCount.S == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.S = 0;
      };
    }

    else if (key.id === "68") {
      keyCount.D++;
      key.style.transform = "translateY(-" + 20 * keyCount.D + "%)";
      if (keyCount.D == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.D = 0;
      };
    }

    else if (key.id === "70") {
      keyCount.F++;
      key.style.transform = "translateY(-" + 20 * keyCount.F + "%)";
      if (keyCount.F == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.F = 0;
      };
    }

    else if (key.id === "71") {
      keyCount.G++;
      key.style.transform = "translateY(-" + 20 * keyCount.G + "%)";
      if (keyCount.G == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.G = 0;
      };
    }

    else if (key.id === "72") {
      keyCount.H++;
      key.style.transform = "translateY(-" + 20 * keyCount.H + "%)";
      if (keyCount.H == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.H = 0;
      };
    }

    else if (key.id === "74") {
      keyCount.J++;
      key.style.transform = "translateY(-" + 20 * keyCount.J + "%)";
      if (keyCount.J == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.J = 0;
      };
    }

    else if (key.id === "75") {
      keyCount.K++;
      key.style.transform = "translateY(-" + 20 * keyCount.K + "%)";
      if (keyCount.K == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.K = 0;
      };
    }

    else if (key.id === "76") {
      keyCount.L++;
      key.style.transform = "translateY(-" + 20 * keyCount.L + "%)";
      if (keyCount.L == 10) {
        key.style.transform = "translateY(0%)";
        keyCount.L = 0;
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