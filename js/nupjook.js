const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

let moved = false;
let timeout;
let prevX = 0, prevY = 0;
let deltaX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], deltaY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function moveNupjook(event) {
  if (!moved) {
    setTimeout(function() {
      document.querySelector('#nupjook-arm img').style.opacity = '1';
      document.querySelector('#nupjook-body img').style.opacity = '1';
    }, 100);
    prevX = event.clientX;
    prevY = event.clientY;
    moved = true;
    return;
  }

  if (Math.abs(event.clientX - prevX) < 2 && Math.abs(event.clientY - prevY - 10) < 2) return;

  deltaY.shift(); deltaY.push(- event.clientY + prevY - 10);
  deltaX.shift(); deltaX.push(event.clientX - prevX);

  let angle = Math.atan2(average(deltaY) - 7, average(deltaX)) * 180 / Math.PI;
  angle = angle + 90;
  if (angle > 180) angle -= 360;

  document.querySelector('#nupjook-arm img').style.left = `${event.clientX - 9}px`;
  document.querySelector('#nupjook-arm img').style.top = `${event.clientY + 10}px`;
  document.querySelector('#nupjook-arm img').style.transform = `rotate(${angle}deg)`;

  document.querySelector('#nupjook-body img').style.left = `${event.clientX - 20 - 37 * Math.cos(angle / 180 * Math.PI - Math.PI / 2)}px`;
  document.querySelector('#nupjook-body img').style.top = `${event.clientY - 14 - 37 * Math.sin(angle / 180 * Math.PI - Math.PI / 2)}px`;
  document.querySelector('#nupjook-body img').style.transform = `rotate(${angle / 5}deg)`;

  prevX = event.clientX;
  prevY = event.clientY;
  
  clearTimeout(timeout);
  timeout = setTimeout(function() {
    smoothNumpjook(40);
  }, 5);
}

function smoothNumpjook(n) {
  deltaY.shift(); deltaY.push(0);
  deltaX.shift(); deltaX.push(0);

  if (n === 0) document.querySelector('#nupjook-arm img').style.transform = `rotate(0deg)`;
  else {
    let newAngle = (parseFloat(document.querySelector('#nupjook-arm img').style.transform.replace(/[^0-9\.\-]/g,'')) );
    while (newAngle > 180) newAngle -= 360;
    while (newAngle < -180) newAngle += 360;

    newAngle *= n / ( n + 4);
    document.querySelector('#nupjook-arm img').style.transform = `rotate(${newAngle}deg)`;

    document.querySelector('#nupjook-body img').style.left = `${prevX - 20 - 37 * Math.cos(newAngle / 180 * Math.PI - Math.PI / 2)}px`;
    document.querySelector('#nupjook-body img').style.top = `${prevY - 14 - 37 * Math.sin(newAngle / 180 * Math.PI - Math.PI / 2)}px`;
    document.querySelector('#nupjook-body img').style.transform = `rotate(${newAngle / 5}deg)`;
    timeout = setTimeout(function() {
      smoothNumpjook(n - 1);
    }, 5);
  }
}

document.onmousemove = moveNupjook;