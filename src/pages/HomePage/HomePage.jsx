import './HomePage'
import SearchBar from '../../components/SearchBar/SearchBar'
import CityCard from '../../components/CityCard/CityCard'

const HomePage = () => {
    return (
        <>
            <h1> Home page </h1>
            <SearchBar />
            <CityCard />
        </>
    )
}

export default HomePage