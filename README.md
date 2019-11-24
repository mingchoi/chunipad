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

### Credit
Ming Choi - Creator
WebSocket.ahk: https://github.com/G33kDude/WebSocket.ahk
