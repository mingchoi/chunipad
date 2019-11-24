/*
    Constants
*/
const SERVER_IP = "192.168.0.7";
const SERVER_PORT = "3000";
const SWIPE_MODE = true;



/*
    Setup Web Socket
*/
const ws = new WebSocket(`ws://${SERVER_IP}:${SERVER_PORT}`);

ws.onopen = () => {
    console.log('Connected to server')
}

ws.onclose = () => {
    console.log('Disconnected from server')
}



/*
    Main touch events
*/
const keyTotal = 8;
const keyWidth = screen.width / keyTotal;

const touchBS$ = new rxjs.BehaviorSubject();

const touch$ = rxjs.merge(
    rxjs.fromEvent(document, 'touchstart'),
    rxjs.fromEvent(document, 'touchmove'),
    rxjs.fromEvent(document, 'touchend')
).subscribe(evt => touchBS$.next(evt.touches));



/*
    Functions
*/

// Sending key event to server
const sendKey = (n) => (keyDown) => ws.send("Controller.Key" + (keyDown ? "Down-" : "Up-") + n);

const sendAir = (keyDown) => ws.send("Controller.Key" + (keyDown ? "Down-" : "Up-") + "Air");

const detectTouchToAir = (t) => (SWIPE_MODE && t.screenY < screen.height / 2);

const detectTouchToKey = (n) => (t) => {
    if (detectTouchToAir(t)) return false;
    return (t.screenX > keyWidth * n) && (t.screenX < keyWidth * (n + 1));
};



/*
    Map touch events to Keys & send to server
*/
[...Array(keyTotal).keys()].forEach(n => {
    const detectTouchToKeyOfN = detectTouchToKey(n);
    const sendKeyOfN = sendKey(n);

    touchBS$.pipe(
        rxjs.operators.filter(t => t !== undefined),
        rxjs.operators.map(touches => {
            return Array.from(touches)
                .filter(detectTouchToKeyOfN)
                .length > 0;
        }),
        rxjs.operators.distinctUntilChanged()
    ).subscribe(sendKeyOfN);
});

touchBS$.pipe(
    rxjs.operators.filter(t => t !== undefined),
    rxjs.operators.map(touches => {
        return Array.from(touches)
            .filter(detectTouchToAir)
            .length > 0;
    }),
    rxjs.operators.distinctUntilChanged()
).subscribe(sendAir);



/*
    Prevert from showing right click menu
*/
document.addEventListener('contextmenu', event => event.preventDefault());