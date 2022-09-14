import React, {useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import testdata from './Data';
import Chart from 'chart.js/auto';

function LineChart(props){
  console.log(Chart);
    const [chartData, setChartData] =useState({
      datasets: [],
    });
    const [chartOptions, setChartOptions] = useState({});
    console.log("Alue " + props.selectedArea);
    useEffect(() => {
        setChartData({
            labels: testdata?.filter(data=> data.area===props.selectedArea).map(filtered=>(filtered.date.slice(0,10))),
            datasets: [
                {
                    label: "Sairaalassa",
                    data: testdata.filter(data=> data.area===props.selectedArea).map(filtered=>(filtered.totalHospitalised)),
                    borderColor: "#006400", //viiva
                    backgroundColor: "#006400", //piste
                },
                {
                    label: "Osastolla",
                    data: testdata.filter(data=> data.area===props.selectedArea && 1===(0+1)).map(filtered=>(filtered.inWard)),
                    borderColor: "#D2691E", //viiva
                    backgroundColor: "#D2691E", //piste
                },
                {
                    label: "Teho-osastolla",
                    data: testdata.filter(data=> data.area===props.selectedArea).map(filtered=>(filtered.inIcu)),
                    borderColor: "#599BD6", //viiva
                    backgroundColor: "#599BD6", //piste
                },
                {
                    label: "Kuolleet yhteensä",
                    data: testdata.filter(data=> data.area===props.selectedArea).map(filtered=>(filtered.dead)),
                    borderColor: "#000000", //viiva
                    backgroundColor: "#000000", //piste
                },

            ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend:{
              position: "top"
            },
          title: {
            display: true,
            text: props.selectedArea +" 25.3.2020 lähtien"
          }
          },
          layout:{
            padding:20
          }
        })
    }, [props.selectedArea]); 
    return(
      <div><Line options={chartOptions} data={chartData}/></div>
    )
  }

export default LineChart