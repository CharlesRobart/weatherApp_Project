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
            <div className='city-page-widget city-page-widget--current'>
                <h2 className='current-card-title'>Actuellement</h2>

                <div className='current-card-resum'>
                    <div className=''>
                        <p className='city-card-description'> {currentWeather.weather[0].description} </p>
                        <p> Pression : {currentWeather.main.pressure} </p>
                        <p> Humidité : {currentWeather.main.humidity} %</p>
                        <p> Vent : {currentWeather.wind.speed} Km/h </p>
                    </div>

                    <div className=''>
                        <p className='city-card-temp'> {Math.floor(currentWeather.main.temp)} °</p>
                        <img className='city-card-img'src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="icon" />
                    </div>
                </div>

            </div>}
            
        </>
    )
}

export default CurrentWeatherWidget