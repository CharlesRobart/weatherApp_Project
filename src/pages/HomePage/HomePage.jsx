//import axios from 'axios'
import './HomePage.scss'
import { useState , useEffect } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import CityCard from '../../components/CityCard/CityCard'
import MyPositionCard from '../../components/MyPositionCard/MyPositionCard'

const HomePage = () => {

    //State ma position
    const [myPosition, setMyPosition] = useState(null)

    //State des villes
    const [cities, setCities] = useState(() => {
        const savedCities = localStorage.getItem('cities');
        return savedCities ? JSON.parse(savedCities) : [];
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setMyPosition({
                name: 'Ma position',
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
        }); 
    },[]);

    useEffect(() => {
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
                {myPosition && <MyPositionCard cityData={myPosition} />}
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