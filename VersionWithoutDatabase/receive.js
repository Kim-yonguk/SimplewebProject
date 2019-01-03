var mysql=require('mysql');

var mydb=mysql.createConnection({
  user:'root',
  password:'1234'
});

mydb.query('USE Chart');


var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var color;
var value;

socket.bind(3000);

socket.on('listening', function() {
    console.log('listening event');
});

socket.on('message', function(msg, rinfo) {
    console.log('메세지 도착',msg.toString());
    var tmp=msg.toString().split(' ');
    // for(var i in tmp){
    //   console.log(tmp[i]);
    // }
    color=String(tmp[0]);
    value=Number(tmp[1]);
    console.log(typeof(color)+" "+typeof(value));

    var q='INSERT INTO chart (name,value) VALUES(' +mydb.escape(color)+ ',' +mydb.escape(value)+ ')';
    mydb.query(q, function(error,rows,fields){
      if(error)
        console.log(error);
      else
        console.log("success");
    })
});

socket.on('close', function() {
    console.log('close event');
});
