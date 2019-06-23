import React, {useEffect, useState} from 'react';
import constants from './constants';
import './App.css';
import SelectedForeCast from './components/SelectedForeCast';
import FiveDaysForeCast from './components/FiveDaysForeCast';

function App() {
  const [foreCast, setForecast] = useState({});
  const [selectedState, setSelectedState] = useState(constants.states[0].id);
  const [tempUnit, setTempUnit] = useState('C');
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    
    const fetchWeatherForecast = () => fetch(`https://api.openweathermap.org//data/2.5/forecast?id=${selectedState}&appid=00a6dbc538e6a5bd82992cb0d00f1621`).then(res=>res.json());

    fetchWeatherForecast().then(res=>{
      if(parseInt(res.cod) === 200) {
        const fiveDaysForeCast = {
          cityName: res.city.name,
          cod: res.cod,
          lists: []
        };
        const list = res.list;
        // as api gives you 5 days of 3 hour forecast a day has been divided to 8.
        // to do -> add 12:00 logic
        for (let index = 0; index < list.length; index+=8) {
          const dayForeCast = list[index];
          const filteredForeCast = {
            date: dayForeCast.dt_txt,
            icon: `http://openweathermap.org/img/w/${dayForeCast.weather[0].icon}.png`,
            description: dayForeCast.weather[0].description,
            temp: dayForeCast.main.temp,
            temp_min:  dayForeCast.main.temp_min,
            temp_max: dayForeCast.main.temp_max,
          };
          fiveDaysForeCast.lists.push(filteredForeCast);
        }
        // console.log(JSON.stringify(fiveDaysForeCast));
        setForecast(fiveDaysForeCast);
      }
      else{
        setForecast(res)
      }
    });

  }, [selectedState]);

  const onChangeTempUnit = (unit) => {
    setTempUnit(unit);
  }

  const onSelectDay = (dayIndex) => {
    setSelectedDay(dayIndex);
  }

  return (
    <div className="container">
      {parseInt(foreCast.cod) === 200 && (
        <>
          <div>
            <label>
              Select state:
              <select value={selectedState} onChange={(e)=>setSelectedState(e.target.options[e.target.options.selectedIndex].value)}>
                {constants.states.map(state=><option value={state.id} key={state.id}>{state.name}</option>)}
              </select>
            </label>
            <SelectedForeCast foreCast={foreCast} selectedDay={selectedDay} onChangeTempUnit={onChangeTempUnit} unit={tempUnit}/>
          </div>
          <FiveDaysForeCast lists={foreCast.lists} selectedDay={selectedDay} onSelectDay={onSelectDay} unit={tempUnit}/>
        </>
      )}
      {foreCast.cod === 401 && "Un Authorized, please check the app id."}
    </div>
  );
}

export default App;
