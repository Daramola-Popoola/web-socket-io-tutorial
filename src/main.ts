// import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';

//* initialize express app
const app = express();
// const server = createServer(app);
app.use(express.static('src/public'));
const PORT = process.env.PORT || 8800;
const server = app.listen(PORT);

// TODO: Add the middleware for static files
const io = new Server(server, {});

io.on('connection', (socket) => {
    console.log('a user connected with socket', socket.id);
})

/* server.listen(() => {
    console.log(`Server is running on port ${PORT}`);

}) */