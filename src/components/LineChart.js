import React, {useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
// import testdata from './Data';
import Chart from 'chart.js/auto';

function LineChart(props){
  console.log(Chart);

  const[localData,setLocalData] = useState([]); //talletetaan data localstoragesta tänne

  useEffect(() => { //haetaan data localstoragesta
    const koronaData = JSON.parse(localStorage.getItem('koronaData'));
    console.log("Linechart get localstorage");
    if (koronaData) {
     setLocalData(koronaData);
    }
  }, []);

    const [chartData, setChartData] =useState({
      datasets: [],
    });

    const [chartOptions, setChartOptions] = useState({});
    console.log("Area " + props.selectedArea);
    console.log("Year " + props.selectedYear);
    
    const [vuosi, setVuosi]=useState();
    const [verrattava, setVerrattava]=useState();

    useEffect(() => { //tässä muokataan 'year'ia radiobuttonista tulevalle valitulle vuodelle ja riippuen tilanteesta verrattavien merkkien määrä
      if (props.selectedYear==='kaikki'){ //jos haussa kaikki, vuosi on 202 ja merkkejä 3. Muuten vuosi on valittu, esim. 2020 ja merkkien määrä 4.
        setVuosi('202'); //pitää olla string
        setVerrattava(3);
      }else{
        setVuosi(props.selectedYear)
        setVerrattava(4);
      }
    }, [props.selectedYear]);

    useEffect(() => {
      console.log("Linechart setChartData");
        setChartData({ //filtteröidään localdataa -> jos area on valittu area ja ajanjakso on datesta napattu vuosi -> mapataan muokattu date X-akselille.
            labels: localData.filter(data=> data.area===props.selectedArea && data.date.substring(0,verrattava)===vuosi).map(filtered=>(filtered.date.slice(0,10))),
            datasets: [
                { //filtteröidään localdataa -> jos area on valittu area ja ajanjakso on datesta napattu vuosi -> mapataan totalHospitalised Y-akselille.
                    label: "Sairaalassa",
                    data: localData.filter(data=> data.area===props.selectedArea && data.date.substring(0,verrattava)===vuosi).map(filtered=>(filtered.totalHospitalised)),
                    borderColor: "#02AD36", //viiva
                    backgroundColor: "#02AD36", //piste
                },
                {
                    label: "Osastolla",
                    data: localData.filter(data=> data.area===props.selectedArea && data.date.substring(0,verrattava)===vuosi).map(filtered=>(filtered.inWard)),
                    borderColor: "#E6D20F", //viiva
                    backgroundColor: "#E6D20F", //piste
                },
                {
                    label: "Teho-osastolla",
                    data: localData.filter(data=> data.area===props.selectedArea && data.date.substring(0,verrattava)===vuosi).map(filtered=>(filtered.inIcu)),
                    borderColor: "#FF0000", //viiva
                    backgroundColor: "#FF0000", //piste
                },
                {
                    label: "Kuolleet yhteensä",
                    data: localData.filter(data=> data.area===props.selectedArea && data.date.substring(0,verrattava)===vuosi).map(filtered=>(filtered.dead)),
                    borderColor: "#000000", //viiva
                    backgroundColor: "#000000", //piste
                },
                {
                  label: "Teho-osastolla %",
                  data: localData.filter(data=> data.area===props.selectedArea && data.date.substring(0,verrattava)===vuosi).map(filtered=>((filtered.inIcu/filtered.totalHospitalised*100).toFixed(2))),
                  borderColor: "#5EB0F9", //viiva
                  backgroundColor: "#5EB0F9", //piste
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
            text: props.selectedArea +" "+props.selectedYear
          }
          },
          layout:{
            // padding:20,
          },
          
        })
    }, [props.selectedArea, localData, verrattava, vuosi, props.selectedYear]);

    return(
      <div className='linechart'><Line options={chartOptions} data={chartData}/></div> //palautetaan valmis taulukko
    )
  }

export default LineChart