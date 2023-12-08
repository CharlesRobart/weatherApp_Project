import axios from 'axios'
import { useState, useEffect  } from 'react'
import './NextDaysWidget.scss'
const API_KEY = import.meta.env.VITE_API_KEY

const NextDaysWidget = ({cityData}) => {
    console.log(cityData)
    const [nextDaysWeather, setNextDaysWeather] = useState({});
    const [loading, setLoading] = useState(true);

    

    const fetchNextDaysWeather = async () => {
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lat}&appid=${API_KEY}&lang=fr&units=metric`);
            
            setNextDaysWeather(response.data);
        }
        catch(err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchNextDaysWeather()
    }, []);

    const convertUnixTimeToDate = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'short', 
            day: 'numeric', 
            month: 'short'
        });next-day-container
    };
    
     // Fonction de filtrage pour obtenir les prévisions de midi
    const filterForNoonForecast = (forecastList) => {
        if (!forecastList) {
            return []; // Retourne un tableau vide si forecastList est undefined ou null
        }
        return forecastList.filter(forecast => {
            const date = new Date(forecast.dt * 1000);
            return date.getHours() === 13; // Filtrer pour obtenir les prévisions de midi
        });
    };

    console.log(filterForNoonForecast(nextDaysWeather.list))
    return (
        <article className='city-page-widget'>
            {!loading && 
            <>
            <h2 className='current-card-title'>Météo des prochains jours</h2>
            <div  className='next-day-container'>
            {filterForNoonForecast(nextDaysWeather.list).map((city, index) => {
                return (
                    <div className='next-day-time-icon' key={index}>
                        <p className='next-day-title'>{convertUnixTimeToDate(city.dt)}</p>
                        <img className='next-day-card-img'src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="icon" />
                    </div>
                )
            })}
                
            </div>
            </>
            }
            
        </article>
    )
}

export default NextDaysWidget