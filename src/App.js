import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";

//Pages
import HomePage from "./pages/Home/index";
import CoinInfoPage from "./pages/InfoCoin/index";

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [debounceSearchValue, setDebounceSearchValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceSearchValue(searchValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "97.7vh", overflow: "hidden" }}>
      <BrowserRouter>
        <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
        <Routes>
          <Route path="/" element={<HomePage searchValue={debounceSearchValue} setSearchValue={setSearchValue} />} />
          <Route path="/info_coin" element={<CoinInfoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
