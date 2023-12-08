import axios from 'axios'
import { useState, useEffect  } from 'react'
import './CityCard.scss'
const API_KEY = import.meta.env.VITE_API_KEY

const CityCard = ({cityData, onDeleteCard}) => {
    //States de l'appli
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);

    //Appel API
    const fetchCurrentWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${API_KEY}&lang=fr&units=metric`);
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
        fetchCurrentWeather(currentWeather)
    }, [cityData]);

    
    const deleteCard = ((event)=>{
        const cardElement = event.target.closest('.city-card');
        onDeleteCard(cardElement);
    })

    return (

        <>  
            {!loading && 
            <section id = {currentWeather.id} className='city-card'>
                <button onClick={(event)=> deleteCard(event)} className='city-card-delete'> X </button>
                <div className='city-card-flex'>
                    <h2 className='city-card-title'> {currentWeather.name} </h2>
                    <p className='city-card-description'>{currentWeather.weather[0].description} </p>
                </div>
                <div className='city-card-flex'>
                    <p className='city-card-temp'> {Math.floor(currentWeather.main.temp)} °</p>
                    <img className='city-card-img'src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="icon" />
                </div>
            </section>}
            
        </>
    )

}

export default CityCard