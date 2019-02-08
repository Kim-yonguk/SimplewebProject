var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var msg = new Buffer('test 390');


socket.send(msg, 0, msg.length, 3300, '127.0.0.1',
    function(err) {
        console.log(err);
        if ( err ) {
            console.log('UDP message send error', err);
            return;
        }
        console.log('메세지 전송 성공');
        socket.close();
    }
);
