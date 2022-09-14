import './App.css';
import Haku from './components/Haku';
import LineChart from './components/LineChart';
import * as React from 'react';

const App = () => {

  const [selectedArea, setselectedArea] = React.useState('Finland');

  const handleAreaChange = (event) => {
    setselectedArea(event.target.value);
  };

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
      <div>
      {/* <h1>Koronadataa</h1> */}
      <Dropdown
        label="Valitse alue "
        options={[
          { label: 'Finland', value: 'Finland' },
          { label: 'HYKS', value: 'HYKS' },
          { label: 'TAYS', value: 'TAYS' },
          { label: 'KYS', value: 'KYS' },
          { label: 'OYS', value: 'OYS' },
          { label: 'TYKS', value: 'TYKS' },
        ]}
        value={selectedArea}
        onChange={handleAreaChange}
      />
      <LineChart selectedArea={selectedArea}/>
      <p>Näytetään data alueelta {selectedArea}</p>
        <Haku selectedArea={selectedArea} />
      </div>
      </header>
    </div>
  );
}

export default App;
