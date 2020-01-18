const sockeyio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');
const connections = [];

let io;

exports.setupWebsocket = (server) => {
    io = sockeyio(server);

    io.on('connection', socket => {
        const { latitude, longitude, techs } = socket.handshake.query;
        console.log(socket.handshake.query);
        connections.push({
            id: socket.id,
            cordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs)
        });        
    });
}

exports.findConnections = (cordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(cordinates, connection.cordinates) < 10
            && connection.techs.some(item => techs.includes(item));
    });
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}