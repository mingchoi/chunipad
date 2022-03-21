/*
    Constants
*/
const SERVER_IP = "127.0.0.1";
const SERVER_PORT = "3000";

/*
    Mount DOM
*/
var video = document.querySelector("#videoElement");
const canvas = document.querySelector("#canvasEl");
const btn = document.querySelector("#btn");
const btnStart = document.querySelector("#btnStart");

/*
    Setup Web Socket
*/
const ws = new WebSocket(`ws://${SERVER_IP}:${SERVER_PORT}/ws`);

ws.onopen = () => {
  console.log("Connected to server");
};

ws.onclose = () => {
  console.log("Disconnected from server");
};

/*
	Start Streaming
*/
const stat = document.querySelector("#stat");
navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});
const ctx = canvas.getContext("2d");

/*
	Functions 
*/
const getAverageColor = (context, x, y, size) => {
  const pixels = context.getImageData(x, y, size, size).data;
  let red = 0;
  let green = 0;
  let blue = 0;
  let count = 0;
  for (let i = 0; i < pixels.length; i++) {
    switch (i % 4) {
      case 0:
        red += pixels[i];
        break;
      case 1:
        green += pixels[i];
        break;
      case 2:
        blue += pixels[i];
        break;
      case 3:
        count += 1;
        break;
    }
  }
  return Uint8Array.of(
    Math.floor(red / count),
    Math.floor(green / count),
    Math.floor(blue / count),
    255
  );
};

const getDistance = (a, b) => {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2) +
      Math.pow(a[2] - b[2], 2)
  );
};

const sendAir = (n) => (handUp) =>
  ws.send("air-" + (handUp ? "down-" : "up-") + (6 - n));

/*
	Main Loop
*/
const config = {
  startX: 100,
  startY: 100,
  size: 20,
  gap: 20,
  threshold: 30,
  fullVideo: false,
};

let idleColors = [
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
];

let currentColors = [
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
  Uint8Array.of(0, 0, 0, 255),
];

let distance = [0, 0, 0, 0, 0, 0];
let lastState = [false, false, false, false, false, false];
let sendEvent = false;

requestAnimationFrame(function loop() {
  ctx.drawImage(video, 0, 0, 640, 480);
  for (let i = 0; i < 6; i++) {
    // Process data
    let y = config.startY + (config.size + config.gap) * i;
    currentColors[i] = getAverageColor(ctx, config.startX, y, config.size);
    distance[i] = getDistance(currentColors[i], idleColors[i]);
    let hit = false;
    if (distance[i] > config.threshold) {
      hit = true;
    }

    // Debug draw
    ctx.beginPath();
    if (hit) {
      ctx.strokeStyle = "#ff0000";
    } else {
      ctx.strokeStyle = "#00ff00";
    }
    ctx.rect(config.startX, y, config.size, config.size);
    ctx.stroke();

    // Send websocket event
    if (sendEvent && hit != lastState[i]) {
      sendAir(i + 1)(hit);
      lastState[i] = hit;
    }
  }

  requestAnimationFrame(loop);
});

/*
	DOM Event Listener
*/
btn.addEventListener("click", () => {
  idleColors = [...currentColors];
});

btnStart.addEventListener("click", () => {
  if (sendEvent) {
    sendEvent = false;
    btnStart.innerHTML = "Start";
  } else {
    sendEvent = true;
    btnStart.innerHTML = "Stop";
  }
});
