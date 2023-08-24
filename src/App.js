
import './App.css';
import Search from './components/search';
import CurrentWeather from './components/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast';

function App() {
  const [cureentWeather, setCurrentWeather]= useState(null);
  const [forcast, setForcast]=useState(null);
  const handleOnSearchChange = (searchData)=>{
        const [lat,lon]=searchData.value.split(" ");
        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        const currentForcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        Promise.all([currentWeatherFetch,currentForcastFetch])
        .then(async(response)=>{
          const weatherResponse= await response[0].json();
          const forcastResponse= await response[1].json();
          setCurrentWeather({city: searchData.label,...weatherResponse});
          setForcast({city: searchData.label,...forcastResponse});
         

        })
        .catch((err)=>console.log(err))
  };
  console.log(cureentWeather);
  console.log(forcast)
    return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {cureentWeather &&<CurrentWeather data={cureentWeather}/>}
      {forcast&&<Forecast  data={forcast}/>}
    </div>
  );
}

export default App;
