function updateTimer(christmasDate){
  var time = christmasDate - new Date();
  return {
    'days': Math.floor(time/1000/60/60/24),
    'hours': Math.floor((time/1000/60/60)%24),
    'minutes': Math.floor((time/1000/60)%60),
    'seconds': Math.floor((time/1000)%60),
    'total': time
  };
}

function animateClock(span){
  span.className = "turn";
  setTimeout(function(){
    span.className = "";
  },700);
}

function startTimer(id, christmasDate){
  var timerInterval = setInterval(function(){
      var clock = document.getElementById(id);
      var timer = updateTimer(christmasDate);

      // update html
      clock.innerHTML = '<span>' + timer.days + '</span>'
                      + '<span>' + timer.hours + '</span>'
                      + '<span>' + timer.minutes + '</span>'
                      + '<span>' + timer.seconds + '</span>';

      // animations
      var spans = clock.getElementsByTagName("span");
      animateClock(spans[3]);
      if (timer.seconds == 59) animateClock(spans[2]);
      if (timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
      if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

      // check if we reach the deadline
      if (timer.total < 1){
        clearInterval(timerInterval);
        clock.innerHTML = "<span>0</span><span>0</span><span>0</span><span>0</span><span>0</span>";
      }
    }, 1000);
}

function startSnow(){
  var canvas = document.getElementById("sky");
  var ctx = canvas.getContext("2d");

  // set canvas size to window size
  var width = window.innerWidth;
  var height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  // generate the snow flakes
  var maxFlakes = 100;
  var flakes = [];

  for (var i = 0; i < maxFlakes; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 5 + 2,
      density: Math.random() + 1
    });
  }

  // draw flakes into canvas
  function drawFlakes(){
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (var i = 0; i < maxFlakes; i++) {
      var flake = flakes[i];
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveFlakes();
  }

  var angle = 0;
  function moveFlakes(){
    angle += 0.01;
    for (var i = 0; i < maxFlakes; i++) {
      var flake = flakes[i];
      flake.y += Math.pow(flake.density, 2) + 1;
      flake.x += Math.sin(angle) * 2;

      // if flake reaches the bottom, create a new one on the top
      if (flake.y > height){
        flakes[i] = {
          x: Math.random() * width,
          y: 0,
          radius: flake.radius,
          density: flake.density
        };
      }
    }
  }

  setInterval(drawFlakes, 25);
}

window.onload = function(){
  var christmasDate = new Date("December 25, 2016");
  startTimer("clock", christmasDate);
  startSnow();
};
