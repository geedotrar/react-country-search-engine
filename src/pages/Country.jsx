import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import IntersectIcon from "../assets/svg/Intersect.svg";
import arrowLeft from "../assets/svg/akar-icons_arrow-left.svg";
import InlineLoader from "../components/InlineLoader";

const Country = () => {
  const navigate = useNavigate();
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [callingCodeData, setCallingCodeData] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  const [showCallingCodeTooltip, setShowCallingCodeTooltip] = useState(false);
  const [showCurrencyTooltip, setShowCurrencyTooltip] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      setCountryData(response.data);

      if (response.data && response.data[0].idd?.suffixes) {
        const callingCode = `${response.data[0].idd.root}${response.data[0].idd.suffixes[0]}`.replace("+", "");
        const callingCodeResponse = await axios.get(`https://restcountries.com/v2/callingcode/${callingCode}`);
        setCallingCodeData(callingCodeResponse.data);
      }

      if (response.data && response.data[0].currencies) {
        const currencyCode = Object.keys(response.data[0].currencies)[0];
        const currencyResponse = await axios.get(`https://restcountries.com/v2/currency/${currencyCode}`);
        setCurrencyData(currencyResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [countryName]);

  if (!countryData) return <InlineLoader />;

  const country = countryData[0];
  const altSpellings = country.altSpellings;
  const flag = country.flags;
  const callingCode = `${country.idd.root}${country.idd.suffixes[0]}`.replace("+", "");
  const currency = Object.keys(country.currencies).join(", ");
  const latLong = `${country.latlng[0].toFixed(1)}, ${country.latlng[1].toFixed(1)}`;

  return (
    <div className="container mx-auto px-4 py-10 relative min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="flex items-center mb-8">
        <div
          className="flex items-center bg-violet-500 hover:bg-violet-600 transition-colors rounded-xl px-4 py-2 text-white cursor-pointer shadow-md"
          onClick={() => navigate("/")}
        >
          <img src={arrowLeft} alt="Arrow Left" className="w-4 h-4 mr-2" />
          <span className="text-base sm:text-lg font-medium">Back to Homepage</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 tracking-tight">
          {country.name.common}
        </h1>
        <img className="w-14 h-10 rounded-md shadow" src={flag.png} alt={flag.alt} />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {altSpellings?.slice(0, 3).map((alt, idx) => (
          <span
            key={idx}
            className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
          >
            {alt}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 relative overflow-hidden">
          <h2 className="text-lg font-medium text-gray-700 mb-2">LatLong</h2>
          <p className="text-violet-600 text-3xl font-bold">{latLong}</p>
          <img
            className="w-[300px] absolute bottom-2 right-2 opacity-30"
            src={IntersectIcon}
            alt="Intersection"
          />
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Capital</h2>
          <p className="text-violet-600 text-xl">{country.capital}</p>
          <h2 className="text-lg font-medium text-gray-700 mt-4">Region</h2>
          <p className="text-violet-600 text-xl">{country.region}</p>
          <h2 className="text-lg font-medium text-gray-700 mt-4">Subregion</h2>
          <p className="text-violet-600 text-xl">{country.subregion}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-1">Calling Code</h2>
          <p className="text-violet-600 text-4xl font-bold">{callingCode}</p>
          <div
            onMouseOver={() => setShowCallingCodeTooltip(true)}
            onMouseOut={() => setShowCallingCodeTooltip(false)}
            className="mt-2 text-sm text-violet-600 underline cursor-pointer inline-block"
          >
            {callingCodeData?.length || 1} country
          </div>
          <span className="ml-1 text-sm text-gray-700">with this calling code</span>
          {showCallingCodeTooltip && callingCodeData?.length > 0 && (
            <ul className="mt-2 text-sm bg-gray-100 rounded-md p-3 shadow-inner space-y-1">
              {callingCodeData.map((dt, index) => (
                <li key={index} className="text-gray-800">{dt.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-1">Currency</h2>
          <p className="text-violet-600 text-4xl font-bold">{currency}</p>
          <div
            onMouseOver={() => setShowCurrencyTooltip(true)}
            onMouseOut={() => setShowCurrencyTooltip(false)}
            className="mt-2 text-sm text-violet-600 underline cursor-pointer inline-block"
          >
            {currencyData?.length || 1} country
          </div>
          <span className="ml-1 text-sm text-gray-700">with this currency</span>
          {showCurrencyTooltip && currencyData?.length > 0 && (
            <ul className="mt-2 text-sm bg-gray-100 rounded-md p-3 shadow-inner space-y-1">
              {currencyData.map((dt, index) => (
                <li key={index} className="text-gray-800">{dt.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Country;
