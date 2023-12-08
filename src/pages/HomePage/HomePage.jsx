//import axios from 'axios'
import './HomePage.scss'
import { useState , useEffect } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import CityCard from '../../components/CityCard/CityCard'

const HomePage = () => {

    //State des villes
    const [cities, setCities] = useState(() => {
        const savedCities = localStorage.getItem('cities');
        return savedCities ? JSON.parse(savedCities) : [];
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('lat: ' ,position.coords.latitude);
            console.log('lon: ' ,position.coords.longitude);
        });

        localStorage.setItem('cities' , JSON.stringify(cities));
    },[cities])

    const onDeleteCard = (cardElement) => {
        const deleteCard = cities.filter((city, index) => index !== cardElement);
        setCities(deleteCard);
      };
    
    return (
        <div className='home-page-container'>
            <h1 className='home-page-title'> Météo </h1>
            <SearchBar cities={cities} setCities = {setCities} />
            <div className='city-card-container'>
                {cities.map((city, index) => {

                    return (
                        
                        <CityCard key={index} cityData={city}  onDeleteCard={() => onDeleteCard(index)}/>
                    )

                })}
            </div>
        </div>
    )
}

export default HomePage