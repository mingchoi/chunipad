const express = require('express')
const SocketServer = require('ws').Server

const SERVER_PORT = 3000

const server = express()
    .use(express.static("public"))
    .listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))

const wss = new SocketServer({ server })

let keyServer;
let controller;

const sendKey = (n) => {
    if (keyServer !== undefined) keyServer.send(n)
}

wss.on('connection', ws => {
    let type = "Unknown";

    ws.on('message', msg => {
        console.log(`Received message: ${msg}`)
        if (msg == "KeyServer.Register") {
            keyServer = ws;
            type = "KeyServer"
        } else if (msg == "Controller.Register") {
            controller = ws;
            type = "Controller"
        } else if (msg.indexOf("Controller.Key") != -1) {
            const cmd = msg.replace("Controller.", "");
            console.log(cmd);
            sendKey(cmd);
        } else {
            console.log(`Unknown command: ${msg}`);
        }
    })

    ws.on('close', () => {
        console.log(`${type} disconnected`);
        switch (type) {
            case "KeyServer":
                keyServer = undefined;
                break;
            case "Controller":
                controller = undefined;
                break;
        }
    })
})