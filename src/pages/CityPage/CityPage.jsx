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

    const {lat , lon} = useParams();
    console.log(lat, lon)
    
    return (
        <>
            <h1>City Page</h1>
            <CurrentWeatherWidget cityData={cities}/>
            <NextHoursWidget cityData={cities}/>
            <NextDaysWidget cityData={cities}/>
        </>
    )
}

export default CityPage

//<NextDaysWidget cityData={cities}/>