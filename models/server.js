// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');

const Sockets  = require('./sockets');


class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );

        // Configuraciones de sockets
        this.io = socketio( this.server, { /* Configuraciones */ } );

    }

    configuracionSockets() {
        new Sockets( this.io ); //Llama la funcion que desea
    }

    middleware() {
        // Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

    }

    execute() {

        // Inicializar Middlewares
        this.middleware();

        // Inicializar Sockets
        this.configuracionSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        });

    }
}

module.exports = Server;