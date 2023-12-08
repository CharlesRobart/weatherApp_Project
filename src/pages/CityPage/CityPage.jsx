import './CityPage'
import NextDaysWidget from '../../components/NextDaysWidget/NextDaysWidget'
import NextHoursWidget from '../../components/NextHoursWidget/NextHoursWidget'
import CurrentWeatherWidget from '../../components/CurrentWeatherWidget/CurrentWeatherWidget'
import { useState } from 'react'
import { useParams } from 'react-router'

const CityPage = () => {
    const [cities, setCities] = useState(
        {name:"Zocca", lon:"10.99", lat:"44.34"},
    );

    const {city, lat, lon} = useParams();
    console.log(city, lat, lon)
    
    return (
        <>
            <h1>{city}</h1>
            <CurrentWeatherWidget cityData={{city, lat, lon}}/>
            <NextHoursWidget cityData={{city, lat, lon}}/>
            <NextDaysWidget cityData={{city, lat, lon}}/>
        </>
    )
}

export default CityPage

//<NextDaysWidget cityData={cities}/>