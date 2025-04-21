import express, { Express } from "express";
import { join } from "path";
import { createServer } from "http";
import { Server } from 'socket.io';
import { upsertUserConnection, createSendPacket, getUserById, deleteUserConnection } from "./utils/util";
import { UsersDB } from "./utils/database";


const app: Express = express();

const server = createServer(app);
const IO = new Server(server);

app.use(express.static(join(__dirname, 'public')));

IO.on('connection', (socket) => {
    console.log('a user has connected, id:', socket.id);
    socket.on('joinRoom', packet => {
        try {
            
            const {username, room} = packet;
            
            if(!username || !room){
                throw new Error('bad request');
            }
            
            socket.join(room);
            const user = upsertUserConnection({id: socket.id, username, room});
            
            socket.emit('message', createSendPacket({username: 'ChatCord Bot', data: `welcome to ChatCord Clone ${packet?.username}`}));
            
            socket.broadcast.to(user.room).emit('message', createSendPacket({username: 'ChatCord Bot', data: `${user.username} has joined the chat`}));
            const userExists = getUserById(socket.id);
        } catch (error) {
            if(error instanceof Error){
                throw  new Error(error.message); 
            }
            
            return error;
        }
    })
    
    socket.on('chatMessage', packet =>  {
        const user = getUserById(socket.id);
        if(!user){
            socket.emit('notification', 'reload page');
        }
        IO.to(user!.room).emit('message', createSendPacket({username: user?.username, data: packet}));
    })
    
    socket.on('disconnect', () => {
        const user = getUserById(socket.id);
        IO.emit('message', createSendPacket({username: 'ChatCord Bot', data: `${user?.username} has left the chat`}));
        deleteUserConnection(socket.id);
    });
    
})

const PORT = process.env.PORT || 8800
server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})