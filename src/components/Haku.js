import testdata from './Data';

const Pvm = (props) => {
    //console.log(props.date)
    return (
        <div>{props.date.slice(0,10)}</div>
    )
}

const Haku = (props) => (
    <div>
    {
      testdata?.map(data => {
        if (props.selectedArea===data.area){
            return (
            <div>
                <Pvm date={data.date}/>alue: {data.area}<br></br>yhteensä:  {data.totalHospitalised}
                <br></br>osastolla: {data.inWard}<br></br>teho-osastolla: {data.inIcu}<br></br>kuolleet yhteensä: {data.dead}
                <br></br><br></br>
            </div>
            )   
        }else{
            return(
                <div></div>
            )
        }
      }).reverse()
    }
  </div>
);
export default Haku;