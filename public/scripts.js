/*
    Constants
*/
const SERVER_IP = "192.168.0.7";
const SERVER_PORT = "3000";



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
    Functions for sending key event to server
*/

const sendKey = (n) => (keyDown) => ws.send("Controller.Key" + (keyDown ? "Down-" : "Up-") + n);



/*
    Map touch events to Keys & send to server
*/
[...Array(keyTotal).keys()].forEach(n => {
    const sendKeyOfN = sendKey(n);

    touchBS$.pipe(
        rxjs.operators.filter(t => t !== undefined),
        rxjs.operators.map(touches => {
            return Array.from(touches)
                .filter(t =>
                    (t.screenX > keyWidth * n) && (t.screenX < keyWidth * (n + 1))
                ).length > 0;
        }),
        rxjs.operators.distinctUntilChanged()
    ).subscribe(sendKeyOfN);
});



/*
    Prevert from showing right click menu
*/
document.addEventListener('contextmenu', event => event.preventDefault());