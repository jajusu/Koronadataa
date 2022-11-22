import './App.css';
// import Haku from './components/Haku'; //demohaku
import LineChart from './components/LineChart';
import FetchData from './components/FetchData';
import React from 'react';

const App = () => {
  const [area, setArea] = React.useState('Finland'); //dropdown

  const handleAreaChange = (event) => { //dropdown
    setArea(event.target.value);
  };

  const Dropdown = ({ label, value, options, onChange }) => { //dropdown
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.key} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };

  const [year, setYear] = React.useState('kaikki'); //radiobutton
  const handle2020 = () => { //radiobutton
    setYear('2020'); 
  };
  const handle2021 = () => { //radiobutton
    setYear('2021');
  };
  const handle2022 = () => { //radiobutton
    setYear('2022');
  };
  const handleAll = () => { //radiobutton
    setYear('kaikki');
  };

  const RadioButton = ({ label, value, onChange }) => { //radiobutton
    return (
      <label>
        <input type="radio" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <Dropdown
        label="Valitse alue "
        options={[
          { label: 'Finland', value: 'Finland', key: 'Finland'},
          { label: 'HYKS', value: 'HYKS', key: 'HYKS'},
          { label: 'TAYS', value: 'TAYS', key: 'TAYS' },
          { label: 'KYS', value: 'KYS', key: 'KYS' },
          { label: 'OYS', value: 'OYS', key: 'OYS' },
          { label: 'TYKS', value: 'TYKS', key: 'TYKS' },
        ]}
        value={area}
        onChange={handleAreaChange}
      />
      <div>
        <RadioButton
          label="2020"
          value={year === '2020'}
          onChange={handle2020}
        />
        <RadioButton
          label="2021"
          value={year === '2021'}
          onChange={handle2021}
        />
        <RadioButton
          label="2022"
          value={year === '2022'}
          onChange={handle2022}
        />
        <RadioButton
          label="kaikki"
          value={year === 'kaikki'}
          onChange={handleAll}
        />
      </div>
      <LineChart selectedArea={area} selectedYear={year}/>
      <FetchData selectedArea={area} selectedYear={year}/>
    </div>
  );
}

export default App;
