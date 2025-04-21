import express, { Express } from "express";
import { join } from "path";
import { createServer } from "http";
import { Server } from 'socket.io';
import { createSendPacket } from "./utils/util";


const app: Express = express();

const server = createServer(app);
const IO = new Server(server);

app.use(express.static(join(__dirname, 'public')));

IO.on('connection', (socket) => {
    console.log('a user has connected, id:', socket.id);
    
    socket.emit('message', createSendPacket({username: 'ChatCord Bot', data: 'welcome to ChatCord Clone'}));
    
    socket.broadcast.emit('message', createSendPacket({username: 'ChatCord Bot', data: 'a new user has joined the chat'}));
    
    socket.on('disconnect', () => {
        IO.emit('message', createSendPacket({username: 'ChatCord Bot', data: 'a user has left the chat'}));
    });
    
    socket.on('chatMessage', packet =>  {
        IO.emit('message', createSendPacket({data: packet}));
    })
})

const PORT = process.env.PORT || 8800
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})