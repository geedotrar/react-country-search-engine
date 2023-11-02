import Country from "./components/Country";
import Homepage from "./components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/country/:countryName" element={<Country />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
