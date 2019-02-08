var values = [];
var it=[];
var data = {
    labels: [
      "1","2","3","4","5"
    ],
    labels:it,
    datasets: [
        {
            // label: 'Your Score',
            data:values,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(231, 111, 152, 0.2)',
                'rgba(222, 122, 133, 0.2)',
                'rgba(123, 134, 64, 0.2)',
                'rgba(44, 42, 123, 0.2)'
            ],
            borderColor: [

                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255,99,132,1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(231, 111, 152, 1)',
                'rgba(222, 122, 133, 1)',
                'rgba(123, 134, 64, 1)',
                'rgba(44, 42, 123, 1)',
            ],
            borderWidth: 1
        }
    ]
};

var options = {
    animation: {
        animateScale: true
    },
    legend: {
        display: false
    },
    responsive: true,
    scales: {
        yAxes: [{
                display: true,
                ticks: {

                    beginAtZero: true,
                    // min: 50,
                    // max: 400,
                    // stepSize:50
                }
            }],
        xAxes:[{
            display: true,
            ticks:{
                beginAtZero:true
            }
        }]
    },
    layout:{
      padding:{
        left:100,
        right:100,
        top:20
      }
    }
};

var ctx = document.getElementById("myChart").getContext('2d');
sendAjax('http://localhost:3000/1');
var myBarChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});

var button = document.getElementById("sendAjax")
var tButton=document.getElementById("testBtn")
 
button.addEventListener("click", function() {
    sendAjax('http://localhost:3000/1');
})

window.onload = function(){
    var button = document.getElementById('sendAjax');
    setInterval(function(){
      myBarChart.clear();
        button.click();
    },3000);  // this will make it click again every 5000 miliseconds
};

function sendAjax(url) {
    var oReq = new XMLHttpRequest();

    oReq.open('POST', url);
    oReq.setRequestHeader('Content-Type', "application/json") // json 형태로 보낸다
    oReq.send();
    oReq.addEventListener('load', function() {
        var result = JSON.parse(oReq.responseText);

        var score = result.score;
        var insert_date=result.insert_date;

        var comp_data = data.datasets[0].data;
        var t_data=data.labels;

        var index=1;
        var i;
        if(score.length < 5){
          i=0;
          console.log('<');
        }

        else {
          i=score.length-5;
          console.log('>')
        }
        comp_data[0]=score[i-1];
        ///xAxes때문에 공간이 뜸
        //t_data[0]=insert_date[i-1];
        for (; i <score.length; i++) {
            console.log(index+" "+i+" "+score[i]);
            console.log(index+" "+i+" "+insert_date[i]);

            comp_data[index]=score[i];
            var tmp_data=insert_date[i].split('T');
            console.log('hi '+insert_date[i].split('T'));
            //t_data[index]=insert_date[i];
            t_data[index]=tmp_data[0];

            index++;
        }

        data.datasets[0].data = comp_data;
        data.labels=t_data;
        myBarChart.update();
    })
}

var numberClicked = false; // 전역 변수로 numberClicked를 설정

function testButton(){
  var tmp=document.getElementById('result').value;
  console.log(tmp);
}

function add (char) {
    if(numberClicked == false) { // 만약 이전에 연산자를 입력 했는데,
        if(isNaN(char) == true) { // 입력 받은 값이 또 다시 연산자면,
            // 아무것도 하지 않는다.
        } else { // 연산자가 아니라면!
            document.getElementById('display').value += char; // 식 뒤에 값을 추가한다.
        }
    } else { // 만약에 이전에 숫자를 입력 했으면,
        document.getElementById('display').value += char; // 식 뒤에 값을 추가한다.
    }

    // 다음 입력을 위해 이번 입력에 숫자가 눌렸는지 연산자가 눌렸는지 설정한다.
    if(isNaN(char) == true) { // "만약 숫자가 아닌게 참이라면" = "연산자를 눌렀다면"
        numberClicked = false; // numberClicked를 false로 설정한다.
    } else {
        numberClicked = true; // numberClicked를 true로 설정한다.
    }
}

function send_nodeDB(){
  var data=result.value;
  console.log("call "+data);
  $.ajax({
    type:"POST",
    dataType: Number,
    data : data,
    contentType: 'application/json',
    success : function(data) {
      console.log('success~');
    },
    error : function(e) {
      console.log('fail~');
    }
  });
}
function calculate() {
    var display = document.getElementById('display');
    var result = eval(display.value); // 식을 계산하고 result 변수에 저장합니다.
    document.getElementById('result').value = result;
}
function reset() {
    document.getElementById('display').value = "";
    document.getElementById('result').value = "";
}
