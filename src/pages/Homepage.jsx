import { useEffect, useState } from "react";
import searchIcon from "../assets/svg/mdi_magnify.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchLoader from "../components/SearchLoader";

const Homepage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search) {
      setLoading(true);
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
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setCountries([]);
      setError(null);
    }
  }, [search]);

  const handleCountryClick = (countryName) => {
    navigate(`/country/${countryName}`);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 py-10">
      <h1 className="text-5xl sm:text-7xl font-bold text-gray-800 text-center mb-12 font-['SF Pro Text'] tracking-tight">
        Country
      </h1>

      <div className="w-full max-w-xl flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm transition-all focus-within:shadow-md">
        <img src={searchIcon} alt="searchIcon" className="h-5 w-5 mr-3 opacity-60" />
        <input
          type="text"
          className="flex-grow text-lg text-gray-800 placeholder-gray-400 outline-none font-medium font-['SF Pro Text']"
          placeholder="Type any country name..."
          value={search}
          onChange={handleInputChange}
        />
      </div>

      {search && (
        <div className="w-full max-w-xl mt-3 bg-white rounded-xl shadow-lg border border-gray-200 transition-all overflow-hidden">
          {loading ? (
            <SearchLoader />
          ) : error ? (
            <div className="text-red-500 text-center p-4 text-base font-['SF Pro Text']">{error}</div>
          ) : (
            <ul className="text-gray-800 text-base font-['SF Pro Text']">
              {countries.map((country) => (
                <li
                  key={country.cca2}
                  className="cursor-pointer px-4 py-3 hover:bg-violet-50 transition-all duration-200"
                  onClick={() => handleCountryClick(country.name.common)}
                >
                  {country.name.common}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Homepage;
