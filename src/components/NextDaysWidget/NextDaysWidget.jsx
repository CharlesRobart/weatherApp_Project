import axios from 'axios'
import { useState, useEffect  } from 'react'
import './NextDaysWidget'

const NextDaysWidget = ({cityData}) => {
    console.log(cityData)
    const [nextDaysWeather, setNextDaysWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const convertUnixTimeToDate = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString('fr-FR', {
            weekday: 'long', 
            day: 'numeric', 
            month: 'long'
        });
    };

    const fetchNextDaysWeather = async () => {
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${cityData.lat}&lon=${cityData.lon}&cnt=5&appid=ac2ddbeaf63004ea80756a0156a76da8`);
            
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

    
    return (
        <>  
            {!loading && 
            <>
            <h2>Météo des prochains jours</h2>
            <div>
            {nextDaysWeather.list.slice(0, 3).map((city, index) => {
                return (
                    <p key={index}>{convertUnixTimeToDate(city.dt)} {city.main.temp}°</p>
                )
            })}
                
            </div>
            </>
            }
            
        </>
    )
}

export default NextDaysWidget