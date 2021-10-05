/*
    Constants
*/
const SERVER_IP = "192.168.0.10";
const SERVER_PORT = "3000";
const SWIPE_MODE = true;

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
    Main touch events
*/
const keyTotal = 32;
const keyWidth = document.body.clientWidth / 16;

const touchBS$ = new rxjs.BehaviorSubject();

const touch$ = rxjs
  .merge(
    rxjs.fromEvent(document, "touchstart"),
    rxjs.fromEvent(document, "touchmove"),
    rxjs.fromEvent(document, "touchend")
  )
  .subscribe((evt) => touchBS$.next(evt.touches));

/*
    Functions
*/

// Sending key event to server
const sendKey = (n) => (keyDown) =>
  ws.send("Controller.Key32" + (keyDown ? "down-" : "up-") + btnRouter(n));
// const sendKey = (n) => (keyDown) => console.log(n);
// const sendKey = (n) => (keyDown) =>
//   keyDown
//     ? (document.getElementById(`btn${btnRouter(n)}`).className = "hover")
//     : (document.getElementById(`btn${btnRouter(n)}`).className = "");

const btnRouter = (n) =>
  [
    0, // not exist
    32,
    30,
    28,
    26,
    24,
    22,
    20,
    18,
    16,
    14,
    12,
    10,
    8,
    6,
    4,
    2,
    31,
    29,
    27,
    25,
    23,
    21,
    19,
    17,
    15,
    13,
    11,
    9,
    7,
    5,
    3,
    1,
  ][n];

const detectTouchToKey = (n) => (t) => {
  console.log(t);
  let col = n;
  if (n >= 1 && n <= 16) {
    if (t.screenY <= document.body.clientHeight / 2) {
      return false;
    }
  } else if (n >= 17 && n <= 32) {
    if (t.screenY > document.body.clientHeight / 2) {
      return false;
    }
    col -= 16;
  } else {
    return false;
  }
  return t.screenX > keyWidth * (col - 1) && t.screenX < keyWidth * col;
};

/*
    Map touch events to Keys & send to server
*/
[...Array(keyTotal).keys()]
  .map((n) => n + 1)
  .forEach((n) => {
    const detectTouchToKeyOfN = detectTouchToKey(n);
    const sendKeyOfN = sendKey(n);

    touchBS$
      .pipe(
        rxjs.operators.filter((t) => t !== undefined),
        rxjs.operators.map((touches) => {
          return Array.from(touches).filter(detectTouchToKeyOfN).length > 0;
        }),
        rxjs.operators.distinctUntilChanged()
      )
      .subscribe(sendKeyOfN);
  });

/*
    Prevert from showing right click menu
*/
document.addEventListener("contextmenu", (event) => event.preventDefault());

/*
    Setup UI
*/
// [...Array(keyTotal).keys()]
//   .map((n) => n + 1)
//   .forEach((n) => (document.getElementById(`btn${n}`).innerHTML = n));
