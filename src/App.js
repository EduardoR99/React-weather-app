import React, { useEffect, useState } from "react";
import TopBtns from "./components/TopBtns";
import Inputs from "./components/Inputs";
import TimeAndLocal from "./components/TimeAndLocal";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/WeatherService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [query, setQuery] = useState({ q: 'berlin' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
        const message =query.q ? query.q : 'current location.';

        toast.info('fetchin weather for ' + message)
       await getFormattedWeatherData({...query, units}).then((data) => {

        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`)

        setWeather(data);
      });

    };

    fetchWeather();
  }, [query, units])

  const formatBagkground = () => {
    if(!weather) return 'from-cyan-700 to-blue-700';
    const threshold = units === 'metric' ? 20 : 60
    if(weather.temp <= threshold)return 'from-cyan-700 to-blue-700';

    return 'from-yellow-700 to-orange-700'
  }


  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br 
     h-fit shadow-xl shadow-black ${formatBagkground()} mb-3`}>
      <TopBtns setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
          <TimeAndLocal weather={weather} />
          <TemperatureAndDetails weather={weather}/>
          <Forecast title='Hourly forecast' items={weather.hourly}/>
          <Forecast title='Daily forecast' items={weather.daily}/>
        </div>
      )}

      <ToastContainer autoClose={3000} theme='colored' newestOnTop={true}/>
    </div>
  );
}

export default App;
