import React, { useState, useEffect } from 'react'
import './SearchBox.css';

function SearchBox({ imgSrc, inputName, selectedCity, setSelectedCity }) {
    const [userInput, setUserInput] = useState("");
    const [dropdown, setDropdown] = useState([])
    const [open, setOpen] = useState(false)
    const [clicked, setClicked] = useState(false)

    const [cityData, setCityData] = useState([]);

    const onCitiesClick = (city) => {
        setUserInput(city.name + ", " + city.state);
        setSelectedCity(city.name + ", " + city.state);
        setOpen(false)
        setClicked(true)
    }

    useEffect(() => {

        // Autocomplete Logic
        if (cityData && userInput) {

            const x = cityData?.filter(city => city.name.toUpperCase().includes(userInput.toUpperCase) || city.state.toUpperCase().includes(userInput))
                .sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1)
                .slice(0, 8)
                .map((city) => {
                    return <li
                        className="dropdown__list"
                        onClick={() => onCitiesClick(city)}
                        key={city.id}
                    >
                        {city.name}, {city.state}
                    </li>;
                });

            // Close dropdown on clicking cities item
            if (userInput.length !== selectedCity?.length) setOpen(true);

            setClicked(false);

            if (userInput.length) (clicked) ? setOpen(false) : setOpen(true)
            else setOpen(false);

            setDropdown(x);
        }

        if (userInput === "") {
            setOpen(false)
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInput, cityData, clicked])

    const updateSelectedInp = (e) => {
        setSelectedCity(e.toUpperCase());
        setUserInput(e.toUpperCase())
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await fetch('./States.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setCityData(myJson)
            })
    }


    return (
        <>
            <div className="input__wrapper">
                <i className="text__icon">
                    <img src={imgSrc} alt="locationIcon" />
                </i>
                <input
                    className="text__input"
                    type="text"
                    name={inputName}
                    placeholder="Enter Location"
                    required={true}
                    autoComplete="off"
                    onChange={e => { updateSelectedInp(e.target.value) }}
                    value={selectedCity}
                />
            </div>

            <ul
                id='dropdown'
                className={open && dropdown.length ? "dropdown__menu" : "no__dropdown__menu"}>
                {dropdown}
            </ul>

        </>
    )
}

export default SearchBox
