import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Xstate.css';

export function Xstate(){
    const [coutries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const getCountries = async () => {

        const url = "https://crio-location-selector.onrender.com/countries";

        await axios.get(url)
            .then(resp=> {
                console.log(resp.data);
                setCountries(resp.data);
            })
            .catch(error => {
                console.error("Error in countries API call", error);
            });

    };

    const getStates = async (selectedCountry) => {

        const url = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;

        await axios.get(url)
            .then(resp=> {
                console.log(resp.data);
                setStates(resp.data);
                setSelectedState("");
                setCities([]);
                setSelectedCity("");
            })
            .catch(error => {
                console.error("Error in cities API call", error);
            });

    };

    const getCities = async (country, state) => {

        const url = `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`;

        await axios.get(url)
            .then(resp=> {
                console.log(resp.data);
                setCities(resp.data);
                console.log(cities);
                setSelectedCity("");
            })
            .catch(error => {
                console.error("Error in cities API call", error);
            });

    };

    useEffect(() => {getCountries()}, []);

    useEffect(() => {
        if(selectedCountry){
            getStates(selectedCountry);
        }}, [selectedCountry]);

    useEffect(() => {
        if(selectedCountry && selectedState){
            getCities(selectedCountry, selectedState);
        }}, [selectedCountry, selectedState]);


    return(
        <div >
            <h1>Select Location</h1>
            <div className='options'>
            <select className='option'
                value={selectedCountry}
                onChange={(e)=> setSelectedCountry(e.target.value)}
            >
                <option value="" disabled>
                    Selected Country
                </option>
                {coutries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <select className='option'
                value={selectedState}
                onChange={(e)=> setSelectedState(e.target.value)}
                disabled={!selectedCountry}
            >
                <option disabled>
                    Selected State
                </option>
                {states.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
            </select>
            <select className='option'
                value={selectedCity}
                onChange={(e)=> setSelectedCity(e.target.value)}
                disabled={!selectedState}
            >
                <option disabled>
                    Selected City
                </option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            </div>
            {selectedCity && (
                <h2>
                    You selected 
                    <span className='heighlight'>{" "}{selectedCity},</span> 
                    <span className='dull'>{" "}{selectedState}, {selectedCountry}</span>
                </h2>
            )}
        </div>
    );
}