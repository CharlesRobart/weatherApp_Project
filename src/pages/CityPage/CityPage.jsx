import './CityPage'
import NextDaysWidget from '../../components/NextDaysWidget/NextDaysWidget'
import NextHoursWidget from '../../components/NextHoursWidget/NextHoursWidget'
import CurrentWeatherWidget from '../../components/CurrentWeatherWidget/CurrentWeatherWidget'

const CityPage = () => {
    return (
        <>
            <h1> City Page</h1>
            <CurrentWeatherWidget />
            <NextHoursWidget />
            <NextDaysWidget />
        </>
    )
}

export default CityPage