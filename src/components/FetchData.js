import React,{useState,useEffect} from 'react';

function FetchData(props) {

  function ModifyDate(){
    let utc = new Date().toJSON().slice(0,10).replace(/-/g,'/'); //talletettava ja verrattava pvm samaan muotoon
    console.log("Modifydate UTC",utc); //UTC, ei Suomen ajassa
    return utc;
  }

  useEffect(()=>{ //haetaan data
    const getData=()=>{
      let dateToday=ModifyDate();
      if (localStorage.length===0 || dateToday!==localStorage.getItem('date')){ //ls tyhjä tai ls:n 'date' eri kuin,haetaan data
        fetch('https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaHospitalData'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
        )
          .then(function(response){
            console.log("Response",response)
            return response.json();
          })
          .then(function(myJson) {
            console.log("Data loaded",myJson.hospitalised);
            localStorage.setItem('koronaData', JSON.stringify(myJson.hospitalised)); //talletetaan fetchattu data localstorageen
            let fetchDate=ModifyDate();
            localStorage.setItem('date', fetchDate); //talletetaan myös fetchauksen päivämäärä
            console.log("Fetch set localstorage");
          })
          .then(function(){
            setTimeout(() => {
              window.location.reload(false); //datan latauksen jälkeen ladataan sivu uudelleen kuuden sekunnin jälkeen, 
              console.log('Reload page'); //jotta dataa käytetään chartissa. Huono vaihtoehto, mutta menettelee.
            }, 6000); //odotetaan dataa kuusi sekuntia ja ladataan sivu uudelleen.
          })
          ;
      }else{
        console.log("Data already fetched", localStorage.length);
      }
    }
    getData();
  }, []) //vain ekalla renderillä
  
  const[localData,setLocalData] = useState([]); 
  useEffect(() => { //haetaan data localstoragesta, jotta sitä voidaan näyttää alempana
    const koronaData = JSON.parse(localStorage.getItem('koronaData'));
    console.log("Fetch get localstorage")
    if (koronaData) {
     setLocalData(koronaData);
    }
  }, []);

  const [vuosi, setVuosi]=useState();
  const [verrattava, setVerrattava]=useState();

  useEffect(() => { //tässä muokataan 'year'ia radiobuttonista tulevalle valitulle vuodelle ja riippuen tilanteesta verrattavien merkkien määrä
    if (props.selectedYear==='kaikki'){ //jos haussa kaikki, vuosi on 202 ja verrattavia merkkejä 3, sopii siis kaikkiin. Muuten vuosi esim. 2020 ja merkkien määrä 4.
      setVuosi('202'); //pitää olla string
      setVerrattava(3);
    }else{
      setVuosi(props.selectedYear)
      setVerrattava(4);
    }
  }, [props.selectedYear]);

  const Pvm = (props) => { //muokataan päivämäärä kivemman näkoiseksi
    return (
        <div>{props.date.slice(0,10)}</div>
    )
  }

  const Suhdeluku = (props) => { //palauttaa suhdeluvun
    let teholla=parseInt(props.inIcu);
    let kaikki=parseInt(props.totalHospitalised);
    let suhde=teholla/kaikki*100;
    return (
        <div>teholla(%): {suhde.toFixed(2)}</div>
    )
  }


  return (
    <div>
    {
      localData.map ((data,index) => {
        if (data.area===props.selectedArea && data.date.substring(0,verrattava)===vuosi){
            return (
            <div key={index}>
                <Pvm date={data.date}/>alue: {data.area}<br></br>yhteensä:  {data.totalHospitalised}
                <br></br>osastolla: {data.inWard}<br></br>teho-osastolla: {data.inIcu}<br></br>kuolleet yhteensä: {data.dead}
                <Suhdeluku inIcu={data.inIcu} totalHospitalised={data.totalHospitalised}/>
                <br></br><br></br>
            </div>
            )   
        }else{
            return(
                <div key={index}></div> //täälläkin pitää olla key
            )
        }
      }).reverse() //näytetään viimeisin ensin
    }
    </div>
  );
}

export default FetchData;