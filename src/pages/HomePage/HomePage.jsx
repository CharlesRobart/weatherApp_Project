//import axios from 'axios'
import './HomePage'
import { useState  } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import CityCard from '../../components/CityCard/CityCard'

const HomePage = () => {

    //State des villes
    const [cities, setCities] = useState([
        {name:"Zocca", lon:"10.99", lat:"44.34"},
        {name:"Les sables", lon:"-1.79", lat:"46.49"}
    ]);
    
    return (
        <>
            <h1> Home page </h1>
            <SearchBar cities={cities} setCities = {setCities} />
            {cities.map((city, index) => {
                console.log("avant"+city)
                return (<CityCard key={index} cityData={city} />)
            })}
            
        </>
    )
}

export default HomePage