var runStart = 0;
function keyCheck(event) {
  if (event.which == 13) {
    if (runWorkerId == 0) {
      runWorkerId = setInterval(run, 100);
      runStart = 1;
      runSound.play();
      backgroundWokerId = setInterval(moveBackground, 100);
      scoreWorkeId = setInterval(updateScore, 100);
      blockWorkerId = setInterval(createBlock, 100);
      moveBlockWorkerId = setInterval(moveblocks, 100);
      coinWorkerId = setInterval(createCoin, 100);
      moveCoinWorkerId = setInterval(moveCoin, 100);
    }
  }
  if (event.which == 32) {
    if (runStart == 1) {
      if (jumpWorkerId == 0) {
        clearInterval(runWorkerId);
        runSound.pause();
        jumpWorkerId = setInterval(jump, 100);
        jumpSound.play();
      }
    }
  }
}
var runSound = new Audio("run.mp3");
runSound.loop = true;
var boy = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId = 0;
function run() {
  runImageNumber++;
  if (runImageNumber == 8) {
    runImageNumber = 1;
  }
  boy.src = "Run (" + runImageNumber + ").png";
}

var jumpSound = new Audio("jump.mp3");
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var boyMarginTop = 483;
var boyMarginLeft = 30;
function jump() {
  jumpImageNumber++;
  if (jumpImageNumber <= 5) {
    boyMarginTop = boyMarginTop - 60;
    boy.style.marginTop = boyMarginTop + "px";
    boyMarginLeft = boyMarginLeft + 30;
    boy.style.marginLeft = boyMarginLeft + "px";
  }
  if (jumpImageNumber >= 7) {
    boyMarginTop = boyMarginTop + 60;
    boy.style.marginTop = boyMarginTop + "px";
    boyMarginLeft = boyMarginLeft - 30;
    boy.style.marginLeft = boyMarginLeft + "px";
  }
  if (jumpImageNumber == 10) {
    jumpImageNumber = 1;

    clearInterval(jumpWorkerId);
    jumpWorkerId = 0;

    runWorkerId = setInterval(run, 100);
    runSound.play();
  }
  boy.src = "Jump (" + jumpImageNumber + ").png";
}
var backgroundSound = new Audio("wind.mp3");
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWokerId = 0;
function moveBackground() {
  backgroundX = backgroundX - 20;
  background.style.backgroundPositionX = backgroundX + "px";
  backgroundSound.play();
}

var score = document.getElementById("score");
var newScore = 0;
var scoreWorkeId = 0;
function updateScore() {
  newScore++;
  score.innerHTML = newScore;
}

var blockMarginLeft = 1000;
var blockWorkerId = 0;
var blockId = 1;
function createBlock() {
  var block = document.createElement("div");
  block.className = "block";

  block.id = "block" + blockId;
  blockId++;

  var gap = Math.random() * (1000 - 400) + 400;
  blockMarginLeft = blockMarginLeft + gap;

  block.style.marginLeft = blockMarginLeft + "px";
  background.appendChild(block);
}
var moveBlockWorkerId = 0;
function moveblocks() {
  for (var i = 1; i <= blockId; i++) {
    var currentBlock = document.getElementById("block" + i);
    var currentMarginLeft = currentBlock.style.marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 40;
    currentBlock.style.marginLeft = newMarginLeft + "px";
    if (newMarginLeft <= 186) {
      if (newMarginLeft > 6) {
        if (boyMarginTop <= 483) {
          if (boyMarginTop > 433) {
            clearInterval(runWorkerId);
            runSound.pause();
            clearInterval(jumpWorkerId);
            jumpWorkerId = -1;
            clearInterval(backgroundWokerId);
            clearInterval(scoreWorkeId);
            clearInterval(blockWorkerId);
            clearInterval(moveBlockWorkerId);
            clearInterval(moveCoinWorkerId);
            deadWorkerId = setInterval(dead, 100);
            deadSound.play();
          }
        }
      }
    }
  }
}
var coinSound = new Audio("coin.mp3");
var coinMarginLeft = 1000;
var coinWorkerId = 0;
var coinId = 1;
function createCoin() {
  var coin = document.createElement("div");
  coin.className = "coin";

  coin.id = "coin" + coinId;
  coinId++;
  var gap = Math.random() * (1000 - 400) + 100;
  coinMarginLeft = coinMarginLeft + gap;
  coin.style.marginLeft = coinMarginLeft + "px";
  background.appendChild(coin);
}
var coinsColleted = 0;
var moveCoinWorkerId = 0;
function moveCoin() {
  for (var i = 1; i <= coinId; i++) {
    var currentCoin = document.getElementById("coin" + i);
    var currentCoinMarginLeft = currentCoin.style.marginLeft;
    var newCoinMarginLeft = parseInt(currentCoinMarginLeft) - 25;
    currentCoin.style.marginLeft = newCoinMarginLeft + "px";
    if (newCoinMarginLeft <= 212) {
      if (newCoinMarginLeft > 100) {
        coinSound.play();
        coinsColleted += 1;
        document.getElementById("coinscolleted").innerHTML = coinsColleted;
      }
    }
  }
}
var deadSound = new Audio("dead.mp3");
var deadImageNumber = 1;
var deadWorkerId = 0;
function dead() {
  deadImageNumber++;
  if (deadImageNumber == 10) {
    deadImageNumber = 9;
    boy.style.marginTop = "483px";
    document.getElementById("gameover").style.visibility = "visible";
    document.getElementById("endscore").innerHTML = newScore;
    document.getElementById("endcoin").innerHTML = coinsColleted;
  }
  boy.src = "Dead (" + deadImageNumber + ").png";
}

function re() {
  location.reload();
}
function htm() {
  document.getElementById("test").innerHTML = "start.html";
}

//satrt page
var lordSound = new Audio("lording.mp3");
var startSound = new Audio("start.mp3");
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var myBar = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 50);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        setTimeout(() => {
          document.getElementById("loader").classList.add("hide-loader");
        }, 1000);
        startSound.play();
      } else {
        width++;
        myBar.style.width = width + "%";
        myBar.innerHTML = width + "%";
      }
    }
  }
}
