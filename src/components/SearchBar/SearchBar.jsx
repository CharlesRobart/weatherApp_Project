import './SearchBar.scss'
import {useState} from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

const SearchBar = ({ cities, setCities }) => {

    const [address, setAddress] = useState('');

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress('');
        console.log(results);
        console.log(latLng);
        
        //Créer la nouvelle ville et l'ajouter à cities
        const newCity = {
            name:results[0].formatted_address,
            lon:latLng.lng,
            lat:latLng.lat
        }

        setCities([...cities, newCity])

    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div className='search-bar'>
                        <input className='search-bar-input' {...getInputProps({ placeholder: 'Ajouter une ville' })} />
                        <div className="suggestions-container" >
                            {suggestions.map((suggestion , index) => {
                                const style = suggestion.active
                                    ? { backgroundColor: '#345995', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
            )}
        </PlacesAutocomplete>
    );
}

export default SearchBar