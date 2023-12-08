import axios from 'axios'
import { useState, useEffect  } from 'react'
import './CurrentWeatherWidget.scss'

const CurrentWeatherWidget = ({cityData}) => {
    
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchCurrentWeather = async () => {
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&lang=fr&appid=ac2ddbeaf63004ea80756a0156a76da8&units=metric`);
        
            setCurrentWeather(response.data);
        }
        catch(err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrentWeather()
    }, []);

    return (
        <>  
            {!loading && 
            <div className='city-page-widget'>
                <h2>Actuellement</h2>
                <p> {Math.floor(currentWeather.main.temp)} °</p>
                <p> {currentWeather.weather[0].description} </p>
                <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="icon" />
                <p> Pression : {currentWeather.main.pressure} </p>
                <p> Humidité : {currentWeather.main.humidity} %</p>
                <p> Vent : {currentWeather.wind.speed} Km/h </p>
            </div>}
            
        </>
    )
}

export default CurrentWeatherWidget