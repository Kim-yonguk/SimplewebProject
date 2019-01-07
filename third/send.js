var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

//var msg = new Buffer('1 a 100');
//var msg = new Buffer('2 b 120');
 var msg = new Buffer('3 c 140');
// var msg = new Buffer('4 d 160');
// var msg = new Buffer('5 e 180');
//var msg = new Buffer('6 f 70');
// var msg = new Buffer('7 g 250');
// var msg = new Buffer('8 h 300');
//var msg = new Buffer('9 i 400');

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
