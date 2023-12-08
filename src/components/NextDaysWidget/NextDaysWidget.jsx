import axios from 'axios'
import { useState, useEffect  } from 'react'
import './NextDaysWidget'

const NextDaysWidget = ({cityData}) => {
    console.log(cityData)
    const [nextDaysWeather, setNextDaysWeather] = useState({});
    const [loading, setLoading] = useState(true);

    

    const fetchNextDaysWeather = async () => {
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lat}&appid=ac2ddbeaf63004ea80756a0156a76da8&units=metric`);
            
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
        });
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
        <>  
            {!loading && 
            <>
            <h2>Météo des prochains jours</h2>
            <div>
            {filterForNoonForecast(nextDaysWeather.list).map((city, index) => {
                return (
                    <p key={index}>{convertUnixTimeToDate(city.dt)} {city.weather[0].main}</p>
                )
            })}
                
            </div>
            </>
            }
            
        </>
    )
}

export default NextDaysWidget