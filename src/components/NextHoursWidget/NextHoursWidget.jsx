import axios from 'axios'
import { useState, useEffect  } from 'react'
import './NextHoursWidget'

const NextHoursWidget = ({cityData}) => {
    //console.log(cityData)
    const [nextHoursWeather, setNextHoursWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const convertUnixTimeToTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        return date.toLocaleTimeString('fr-FR');
    };

    const fetchNextHoursWeather = async () => {
        
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=ac2ddbeaf63004ea80756a0156a76da8&units=metric`);
            
            setNextHoursWeather(response.data);
        }
        catch(err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchNextHoursWeather()
    }, []);

    console.log(nextHoursWeather.list)
    
    return (
        <>  
            {!loading && 
            <>
            <h2>Météo des prochaines heures</h2>
            <div>
            {nextHoursWeather.list.slice(0, 3).map((city, index) => {
                return (
                    <p key={index}>{convertUnixTimeToTime(city.dt)} {city.main.temp}°</p>
                )
            })}
                
            </div>
            </>
            }
            
        </>
    )
}

export default NextHoursWidget