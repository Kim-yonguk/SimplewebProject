var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));


var mysql = require('mysql');

///저는 mysql 로 설치해서 포트설정하였고 user 랑 password는 mysql 아이디와 비밀번호 / database는 데이터베이스 네임
var connection = mysql.createConnection({
  host: "localhost",
  port:3306,
  user:"root",
  password:"1234",
  database:'Chart'
})
//데이터베이스 연동
connection.connect();
app.use(express.static('public'));

//터미널창에 뜨는부분 의미x
app.listen(3000,function(){
  console.log("server start on port 3000!");
})
app.get('/', function(req,res){
  res.sendFile(__dirname+'/public/main.html');
});

app.post('/1', function(req, res){
  var responseData = {};
  // console.log('postajkshjdjs')
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

app.post('/', function(req, res){
  var test=req.body.result;
  console.log('test');
  console.log("what the " + test);

  //////insert into sb(name,score) values('ee',140);
  ////INSERT INTO sb (name,score) VALUES(' +mydb.escape(name)+ ',' +mydb.escape(score)+ ')';
  var q='INSERT INTO sb(name,score) VALUES(' +connection.escape(test)+ ','+connection.escape(test)+ ')';
  connection.query(q, function(error,rows,fields){
    if(error)
      console.log(error);
    else {
      console.log("success");
    }
  })
});
