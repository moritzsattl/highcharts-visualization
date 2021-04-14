function addDataToChart(url,chart){
    window.fetch("daten/"+url).then((res) => res.text()).then(csv => {
        data = csv.split("\n");
        console.log(data[0])
        data_obj = {
            name: data[0].split(";")[0],
            data: []
        }
        for (let i = 0; i < data.length; i++) {
            let data_obj_line = data[i].split(";");
            //console.log(data_obj_line[2])
            let low = data_obj_line[2].split(":");
            let low2 = parseInt(low[1])/60*100
            //console.log(parseInt(low[1]))
            //console.log(low2)
            //console.log(low[0])

            let high = data_obj_line[3].split(":");
            let high2 = parseInt(high[1])/60
            //console.log(high2)

            data_obj.data.push({
                name: data_obj_line[1],
                low: parseInt(low[0])+(low2/100),
                high: parseInt(high[0])+(high2/100)
            })
            
        }
        console.log(data_obj)
        chart.addSeries(data_obj, false)
        chart.redraw()
    })
}

function removeChartData(chart){
    var length = chart.series.length;
    if (length) {
        for (var j = 0; j < length; j++) {
            chart.series[0].remove(false);
        }
    }
}

var colors = ["#316879",
"#f47a60",
"#49857F",
"#b1b9ba"]

var formatter = function (){
                
    //console.log(this.point)
    //console.log(((this.point.options.low - Math.trunc(this.point.options.low)) * 60))

    var low_1 = Math.trunc(this.point.options.low)
    if(parseInt(low_1) < 10){
        low_1 = "0"+ low_1 
    }
    var low_2 = Math.round(((this.point.options.low - Math.trunc(this.point.options.low)) * 60))
    if(parseInt(low_2) < 10){
        low_2 = "0"+ low_2 
    }
    var low = low_1 +":"+ low_2

    var high_1 = Math.trunc(this.point.options.high)
    if(parseInt(high_1) < 10){
        high_1 = "0"+ high_1 
    }
    var high_2 = Math.round(((this.point.options.high - Math.trunc(this.point.options.high)) * 60))
    if(parseInt(high_2) < 10){
        high_2 = "0"+ high_2 
    }
    var high = high_1 +":"+ high_2

    return "<b>"+ this.series.name+"</b><br/>"+this.point.options.name+" "+low +" - "+ high+ " Uhr";
}

var chart = Highcharts.chart('container', {

    chart: {
        type: 'columnrange',
        inverted: true,
        height: 800,
    },

    accessibility: {
        description: 'Image description: A column range chart compares the monthly temperature variations throughout 2017 in Vik I Sogn, Norway. The chart is interactive and displays the temperature range for each month when hovering over the data. The temperature is measured in degrees Celsius on the X-axis and the months are plotted on the Y-axis. The lowest temperature is recorded in March at minus 10.2 Celsius. The lowest range of temperatures is found in December ranging from a low of minus 9 to a high of 8.6 Celsius. The highest temperature is found in July at 26.2 Celsius. July also has the highest range of temperatures from 6 to 26.2 Celsius. The broadest range of temperatures is found in May ranging from a low of minus 0.6 to a high of 23.1 Celsius.'
    },

    title: {
        text: 'students work schedule'
    },

    subtitle: {
        text: 'Project Pardis'
    },

    xAxis: {
        type: 'category',
        dataSorting: {
            enabled: true,
        },
        alternateGridColor: '#CAE0DD'
    },

    yAxis: {
        title: {
            text: 'Hours (h)'
        },
        min: 0,
        max: 24,
       
    },

    tooltip: {
        valueSuffix: 'h',
        formatter: formatter
    },

    

    plotOptions: {
        columnrange: {

            dataLabels: {
                enabled: false,
                format: '{y}h'
            },
            
        },
        series:{
            pointWidth: 15,
            pointPadding: 2,
            borderWidth: 0,
        },
    },

    legend: {
        enabled: true
    },

    colors: colors

});

document.getElementById('cookbook').addEventListener('click', function (e) {
    
    removeChartData(chart)
    addDataToChart('bajraktarevic_zeiten.csv',chart)
    addDataToChart('tovilovic_zeiten.csv',chart)
    addDataToChart('winkler_zeiten.csv',chart)
    addDataToChart('anna_zeiten.csv',chart)

    chart.setTitle(null, { text: 'Project Cookbook' });

}, false)

document.getElementById('onetimez').addEventListener('click', function (e) {
    
    removeChartData(chart)
    addDataToChart('fabian_zeiten.csv',chart)

    chart.setTitle(null, { text: 'Onetimez' });

}, false)

document.getElementById('oculus').addEventListener('click', function (e) {
    
    removeChartData(chart)
    addDataToChart('utku_zeiten.csv',chart)
    addDataToChart('gritsch_zeiten.csv',chart)
    

    chart.setTitle(null, { text: 'Oculus' });

}, false)

document.getElementById('pardis').addEventListener('click', function (e) {
    removeChartData(chart)

    
    addDataToChart('sattlegger_zeiten.csv',chart)
    addDataToChart('demir_zeiten.csv',chart)
    addDataToChart('tobias_zeiten.csv',chart)
    addDataToChart('pechmann_zeiten.csv',chart)

    chart.setTitle(null, { text: 'Project Pardis' });

    chart.redraw()
}, false)

document.getElementById('barrierefreiheit').addEventListener('click', function (e) {
    //var snd = new Audio("explosions.mp3")
    //snd.play()
    if(!document.getElementById("barrierefreiheit").classList.contains("bar")){
        chart.update({
            colors: ["#292779","#54D686","#DF447F","#8496A6"],
            plotOptions: {
                series:{
                    pointWidth: 18,
                    borderWidth: 2,
                    borderColor:"white",
                    shadow: false
                }
            },
        },true)
        document.getElementById("barrierefreiheit").classList.toggle("bar")
        toggleText("barrierefreiheit")
    }else{
        chart.update({
            colors: colors,
            plotOptions: {
                columnrange: {
        
                    dataLabels: {
                        enabled: false,
                        format: '{y}h'
                    },
                    
                },
                series:{
                    pointWidth: 15,
                    pointPadding: 2,
                    borderWidth: 0,
                },
            },
        },true)
        document.getElementById("barrierefreiheit").classList.toggle("bar")
        toggleText("barrierefreiheit")
    }
    
}, false)

function toggleText(button_id)  {
    var text = document.getElementById(button_id).firstChild;
    text.data = text.data == "Barrierefreiheit ON" ? "Barrierefreiheit OFF" : "Barrierefreiheit ON";
 }

document.getElementById("pardis").click()
