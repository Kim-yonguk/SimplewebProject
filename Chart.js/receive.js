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

socket.bind(3300);

socket.on('listening', function() {
    console.log('listening event');
});

socket.on('message', function(msg, rinfo) {
    console.log('메세지 도착');
    var tmp=msg.toString().split(' ');
    // for(var i in tmp){
    //   console.log(tmp[i]);
    // }
    name=String(tmp[0]);
    score=Number(tmp[1]);

    // num=Number(tmp[0]);
    // uid=String(tmp[1]);
    // score=Number(tmp[2]);
    console.log(name+" "+score);

    var q='INSERT INTO sb (name,score) VALUES(' +mydb.escape(name)+ ',' +mydb.escape(score)+ ')';
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
