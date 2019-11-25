/*
    Constants
*/
const SERVER_IP = "192.168.0.7";
const SERVER_PORT = "3000";
const SWIPE_MODE = true;
const DETECTION_PARAMS = {
  flipHorizontal: true,
  maxNumBoxes: 1,
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6 // confidence threshold for predictions.
};

/*
    Mount DOM
*/
var video = document.querySelector("#videoElement");

/*
    Setup Web Socket
*/
const ws = new WebSocket(`ws://${SERVER_IP}:${SERVER_PORT}`);

ws.onopen = () => {
  console.log("Connected to server");
};

ws.onclose = () => {
  console.log("Disconnected from server");
};

/*
    Hand events
*/

const handBS$ = new rxjs.BehaviorSubject();

let model = null;

// Start web cam
handTrack
  .startVideo(video)
  .then(started => console.log(started ? "Started" : "Web Cam not working"));

// Detection cycle
function runDetection() {
  model.detect(video).then(predictions => {
    handBS$.next(predictions);
    window.requestAnimationFrame(runDetection);
  });
}

// Begin to download model
handTrack.load(DETECTION_PARAMS).then(_model => {
  console.log("Loaded model");
  model = _model;
  runDetection();
});

/*
    Functions
*/

// Sending key event to server
const sendAir = (handUp) => ws.send("Controller.Key" + (!handUp ? "Down-" : "Up-") + "Air");

/*
    Map touch events to Keys & send to server
*/
handBS$
  .pipe(
    rxjs.operators.filter(t => t !== undefined),
    rxjs.operators.map(predictions => predictions.length > 0),
    rxjs.operators.distinctUntilChanged()
  )
  .subscribe(sendAir);
