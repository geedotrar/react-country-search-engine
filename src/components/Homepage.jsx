import React, { useEffect, useState } from "react";
import searchIcon from "../assets/svg/mdi_magnify.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search) {
      axios
        .get(`https://restcountries.com/v3.1/name/${search}`)
        .then((response) => {
          let countryData = response.data;
          if (countryData.length > 5) {
            countryData = countryData.slice(0, 5);
          }
          setCountries(countryData);
          setError(null);
        })
        .catch((error) => {
          console.error(error);
          setCountries([]);
          setError("Data not found");
        });
    } else {
      setCountries([]);
      setError(null);
    }
  }, [search]);

  const handleCountryClick = (countryName) => {
    setSearch(countryName);
    setSelectedCountry(countryName);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    setSelectedCountry(null);
  };

  const handleSearchIconClick = () => {
    if (search) {
      navigate(`/country/${search}`);
    }
  };

  return (
    <div className="w-[1440px] h-[900px] relative bg-white">
      <div className="w-[700px] h-[60px] left-[370px] top-[390px] absolute rounded-[10px] border border-stone-300" style={{ display: "flex", alignItems: "center" }}>
        <input type="text" className="w-full p-2 outline-none text-lg font-medium font-['SF Pro Text']" placeholder="Type any country name" value={search} onChange={handleInputChange} />
        <button onClick={handleSearchIconClick}>
          <img src={searchIcon} alt="searchIcon" />
        </button>
      </div>
      <div className="left-[572px] top-[263px] absolute text-center text-black text-7xl font-bold font-['SF Pro Text']">Country</div>

      {search && !selectedCountry && <div className="w-[700px] h-[228px] left-[370px] top-[460px] absolute bg-white rounded-[5px] shadow" />}

      {error ? (
        <div className="left-[395px] top-[485px] absolute text-red-500 text-lg font-normal font-['SF Pro Text']">{error}</div>
      ) : selectedCountry ? null : (
        search && (
          <ul className="left-[395px] top-[485px] absolute text-black text-lg font-normal font-['SF Pro Text'] hover:w-[650px]">
            {countries.map((country) => (
              <li key={country.cca2} className="cursor-pointer p-1 transition-all duration-300 hover:bg-zinc-100 " onClick={() => handleCountryClick(country.name.common)}>
                {country.name.common}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default Homepage;
