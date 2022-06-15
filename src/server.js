import express from 'express';
import {WebSocket} from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + '/public'));
app.get('/', (req, res) => res.render("home"));

const handleListen = () => console.log(`listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("connected to browser")
    socket.on("close", () => {
        console.log("disconnected from the browser")
    });
    socket.on("message", message => sockets.forEach((aSocket) => aSocket.send(message)))
})
//connection이 생기면 socket을 받는다.
//socket의 메소드

server.listen(3000, handleListen)