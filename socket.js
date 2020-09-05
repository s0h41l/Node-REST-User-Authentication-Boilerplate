const io = require('socket.io');
module.exports = (server) => {
    _io = io(server);
    _io.on('connection', (socket) => {
        
        socket.on('userJoined',(data)=>{
            const msg = {
                name: "Chat Owner",
                socketId: socket.id,
                message: `${data.name} Joined the Chat!`,
                color:"#69c181"
            }
            socket.broadcast.emit('toAll',msg);
        })

        socket.on('toAll', (message) => {
            socket.emit('toAll',{...message, color:"#7fcd91"});
            socket.broadcast.emit('toAll',message)
        })

        socket.on('disconnect', (message) => {
            const msg = {
                name: "Chat Owner",
                message:`${socket.id} left the Chat!`,
                color: "#fc3a52"
            }
            _io.emit('toAll',msg)
        })

    })
}