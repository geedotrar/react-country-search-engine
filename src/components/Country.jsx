import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import IntersectIcon from "../assets/svg/Intersect.svg";
import arrowLeft from "../assets/svg/akar-icons_arrow-left.svg";

const Country = () => {
  const navigate = useNavigate();
  const { countryName } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [callingCodeData, setCallingCodeData] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      setCountryData(response.data);

      if (response.data && response.data[0].idd && response.data[0].idd.suffixes) {
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

  if (!countryData) {
    return <div>Loading...</div>;
  }

  if (!countryData) {
    return <div>Loading...</div>;
  }

  const goBack = () => {
    navigate("/");
  };

  const altSpellings = countryData[0].altSpellings;
  const flag = countryData[0].flags;
  const callingCode = `${countryData[0].idd.root}${countryData[0].idd.suffixes[0]}`.replace("+", "");

  const currencyObj = Object.keys(countryData[0].currencies);
  const currency = currencyObj.join(", ");

  const latLong = `${countryData[0].latlng[0].toFixed(1)}, ${countryData[0].latlng[1].toFixed(1)}`;

  return (
    <div className="w-[1440px] h-[900px] relative bg-white">
      <div className="w-[540px] h-[143px] left-[90px] top-[297px] absolute bg-white rounded-[5px] shadow" />
      <div className="w-[540px] h-[143px] left-[655px] top-[297px] absolute bg-white rounded-[5px] shadow" />
      <div style={{ position: "relative" }}>
        <div className="flex items-center" style={{ position: "absolute", left: "90px", top: "190px" }}>
          <div className="text-center text-black text-5xl font-bold font-['SF Pro Text']">{countryData[0].name.common}</div>
          <img className="w-[46px] h-[30px] ml-4" src={flag.png} alt={flag.alt} />
        </div>
      </div>

      <div className="w-[229px] h-[50px] left-[90px] top-[90px] absolute bg-violet-500 rounded-[10px]" />
      <div className="left-[139px] top-[104px] absolute text-center text-white text-lg font-medium font-['SF Pro Text']">Back to Homepage</div>
      <div className="w-6 h-6 left-[105px] top-[103px] absolute" onClick={goBack}>
        <img src={arrowLeft} alt="Arrow Left" className="w-4 h-3.5 left-[4px] top-[5px] absolute transition-transform transform scale-100 hover:scale-150 cursor-pointer" />
      </div>
      <div className="left-[681px] top-[329px] absolute text-center">
        <span style={{ color: "black", fontSize: "1rem", fontWeight: "normal", fontFamily: "SF Pro Text" }}>Capital:</span>
        <span style={{ color: "black", fontSize: "1rem", fontWeight: "normal", fontFamily: "SF Pro Text" }}>{countryData[0].capital}</span>
      </div>
      <div className="left-[681px] top-[358px] absolute text-center">
        <span style={{ color: "black", fontSize: "1rem", fontWeight: "normal", fontFamily: "SF Pro Text" }}>Region:</span>
        <span style={{ color: "black", fontSize: "1rem", fontWeight: "normal", fontFamily: "SF Pro Text" }}>{countryData[0].region}</span>
      </div>
      <div className="left-[115px] top-[322px] absolute text-center text-black text-lg font-medium font-['SF Pro Text']">LatLong</div>

      {altSpellings && altSpellings[0] && (
        <div>
          <div className="w-[38px] h-[25px] left-[90px] top-[247px] absolute bg-emerald-200 rounded-[50px]" />
          <div className="left-[102px] top-[252px] absolute text-center text-white text-xs font-bold font-['SF Pro Text']">{altSpellings[0]}</div>
        </div>
      )}

      {altSpellings && altSpellings[1] && (
        <div>
          <div className="w-[161px] h-[25px] left-[133px] top-[247px] absolute bg-emerald-200 rounded-[50px]" />
          <div className="left-[149px] top-[252px] absolute text-center text-white text-xs font-bold font-['SF Pro Text']">{altSpellings[1]}</div>
        </div>
      )}

      {altSpellings && altSpellings[2] && (
        <div>
          <div className="w-[145px] h-[25px] left-[299px] top-[247px] absolute bg-emerald-200 rounded-[50px]" />
          <div className="left-[314px] top-[252px] absolute text-center text-white text-xs font-bold font-['SF Pro Text']">{altSpellings[2]}</div>
        </div>
      )}

      <div className="left-[682px] top-[387px] absolute text-center">
        <span style={{ color: "black", fontSize: "1rem", fontWeight: "normal", fontFamily: "SF Pro Text" }}>Subregion:</span>
        <span style={{ color: "black", fontSize: "1rem", fontWeight: "normal", fontFamily: "SF Pro Text" }}>{countryData[0].subregion}</span>
      </div>

      <div className="left-[115px] top-[354px] absolute text-center text-violet-500 text-5xl font-bold font-['SF Pro Text']">{latLong}</div>
      <div className="left-[90px] top-[506px] absolute text-center text-violet-500 text-5xl font-bold font-['SF Pro Text']">{callingCode}</div>
      <div className="left-[655px] top-[506px] absolute text-center text-violet-500 text-5xl font-bold font-['SF Pro Text']">{currency}</div>
      <img className="w-[204px] h-[120.70px] left-[426px] top-[319.30px] absolute" src={IntersectIcon} alt="Intersection" />
      <div className="left-[90px] top-[480px] absolute text-center text-black text-lg font-medium font-['SF Pro Text']">Calling Code</div>
      <div className="left-[655px] top-[480px] absolute text-center text-black text-lg font-medium font-['SF Pro Text']">Currency</div>

      <div className="left-[90px] top-[574px] absolute">
        <span className="cursor-pointer" style={{ color: "violet", fontSize: "0.875rem", fontWeight: "500", fontFamily: "SF Pro Text", textDecoration: "underline" }}>
          {callingCodeData && callingCodeData.length !== null ? callingCodeData.length : 1} country
        </span>
        <span style={{ color: "black", fontSize: "0.875rem", fontWeight: "500", fontFamily: "SF Pro Text" }}> with this calling code</span>
      </div>

      <div className="left-[655px] top-[574px] absolute">
        <span className="cursor-pointer" style={{ color: "violet", fontSize: "0.875rem", fontWeight: "500", fontFamily: "SF Pro Text", textDecoration: "underline" }}>
          {currencyData && currencyData.length !== null ? currencyData.length : 1} country
        </span>
        <span style={{ color: "black", fontSize: "0.875rem", fontWeight: "500", fontFamily: "SF Pro Text" }}> with this currency</span>
      </div>
    </div>
  );
};
export default Country;
