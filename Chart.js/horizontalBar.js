var values = [];
var it=[];
var data = {
    labels: [
      "1","2","3","4","5"
    ],
    labels:it,
    datasets: [
        {
            label: 'Your Score',
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
var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options: options
});
sendAjax('http://localhost:3000/');
var button = document.getElementById("sendAjax")

button.addEventListener("click", function() {
    sendAjax('http://localhost:3000/');
})

window.onload = function(){
    var button = document.getElementById('sendAjax');
    setInterval(function(){
      myBarChart.clear();
        button.click();
    },5000);  // this will make it click again every 5000 miliseconds
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

        //console.log(score.length);


        var comp_data = data.datasets[0].data;
        var t_data=data.labels;

        var index=0;;
        var i;
        if(score.length < 5){
          i=0;
          console.log('<');
        }

        else {
          i=score.length-5;
          console.log('>')
        }

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
