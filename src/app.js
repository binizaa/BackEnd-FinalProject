import express from 'express';
import handlebars from 'express-handlebars';
import viewsRoutes from './routes/views.routes.js';
import { Server } from 'socket.io';

const app = express();
const PORT = 8080;

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', viewsRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

const messages = [];
socketServer.on('connection', (socket) => {
    console.log("Se ha conectado un cliente");
    socket.emit('messages', messages);

    socket.on('message', data => {
        messages.push({ id: socket.id, message: data });
        socketServer.emit('messages', messages);
    });
});
