# chunipad
## How to use
### Start the server
- Run `npm install` to install required library.
- Change `SERVER_IP` in `public/scripts.js` to your server IP.
- Run `npm start` to start the server.
- Open `ahk/KeyServer.exe` for key simulation.

### Start the client
- Use a tablet to open `http://{YOUR_SERVER_IP}:3000` in browser
- Have fun

## Development
Server & Client are written in JavaScript. Server come with express & websocket. Client use rxjs for touch events.

|Type  |Location |
|------|---------|
|Server|server.js|
|Input |ahk/     |
|Client|public/  |

Contribute are welcome!!🤩🤩

## Road map
- [x] Basic 8 key controller
- [ ] Update to 32 key
- [x] Web Cam air detection
- [x] Swipe mode

### Credit
- Ming Choi - Creator
- WebSocket.ahk - from: https://github.com/G33kDude/WebSocket.ahk
