import socketio from 'socket.io-client';
import { api_base } from '../env.json';
const socket = socketio(api_base, {
    autoConnect: false
});

function subscribeTonNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    socket.connect();   
}

function disconnect() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeTonNewDevs
}