import axios from 'axios'
import { useState, useEffect  } from 'react'
import './CityCard'

const CityCard = ({cityData}) => {
    //console.log("avant fetch :" + cityData)
    //States de l'appli
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(true);

    //Appel API
    const fetchCurrentWeather = async () => {
        //console.log("début fetch : " + cityData);
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=ac2ddbeaf63004ea80756a0156a76da8&units=metric`);
        console.log(response.data);
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
            <div>
                <p> Température : {currentWeather.main.temp} </p>
                <p> Description du temps :  </p>
                <img src="" alt="icon" />
                <p> {currentWeather.name} </p>
            </div>}
            
        </>
    )
}

export default CityCard