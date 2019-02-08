var express = require('express');
var app = express();

var options = require('./src/option');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port:3306,
  user:"root",
  password:"1234",
  database:'Chart'
})
connection.connect();

app.use(express.static('public'));

app.listen(3000,function(){
  console.log("server start on port 3000!");
})
app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/main.html');
});
app.get('/line', function(req,res){
  res.sendFile(__dirname+'/public/line.html');
});
app.get('/bar', function(req,res){
  res.sendFile(__dirname+'/public/bar.html');
});
app.get('/horizontalBar', function(req,res){
  res.sendFile(__dirname+'/public/horizontalBar.html');
});


app.post('/*', function(req, res){
  var responseData = {};

  var query =  connection.query('select score, insert_date from sb order by insert_date', function(err,rows){
    responseData.score = [];
    responseData.insert_date=[];
    if(err) throw err;
    if(rows[0]){
      responseData.result = "ok";
      rows.forEach(function(val){
        responseData.score.push(val.score);
        responseData.insert_date.push(val.insert_date);

      })
    }
    else{
      responseData.result = "none";
      responseData.score = "";
    }
    res.json(responseData);

  });
});
