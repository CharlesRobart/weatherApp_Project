import axios from 'axios'
import { useState, useEffect  } from 'react'
import './NextHoursWidget.scss'

const NextHoursWidget = ({cityData}) => {
    
    const [nextHoursWeather, setNextHoursWeather] = useState({});
    const [loading, setLoading] = useState(true);

    const convertUnixTimeToTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        let options = { hour: '2-digit', minute: '2-digit' };
        return date.toLocaleTimeString('fr-FR', options);
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

    
    return (
        <div className='city-page-widget'>  
          {!loading && 
          <article>
            <h2 className='current-card-title'>Météo des prochaines heures</h2>
            <div  className='next-hours-container'>
              {nextHoursWeather.list.slice(0, 5).map((city, index) => {
                  return (
                      <div key={index}>
                        <p className='next-hours-hour' >{convertUnixTimeToTime(city.dt)}</p>
                        <p>{Math.floor(city.main.temp)}°</p>
                      </div>
                  )
              })}
              </div>
                  
          </article>
          }
          
        </div>
    )
}

export default NextHoursWidget