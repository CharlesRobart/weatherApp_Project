//import axios from 'axios'
import './HomePage.scss'
import { useState  } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import CityCard from '../../components/CityCard/CityCard'

const HomePage = () => {

    //State des villes
    const [cities, setCities] = useState([
        {lon:"10.99", lat:"44.34"},
        {lon:"-1.79", lat:"46.49"},
        {lon:"1.10", lat:"49.43"},
        {lon:"1.90", lat:"47.90"}


    ]);

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
                    return (<CityCard key={index} cityData={city}  onDeleteCard={() => onDeleteCard(index)} />)
                })}
            </div>
        </div>
    )
}

export default HomePage