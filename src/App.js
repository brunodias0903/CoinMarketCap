import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

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
      <Navbar setSearchValue={setSearchValue} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home searchValue={debounceSearchValue} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
