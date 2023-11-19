import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "97vh", overflow: "hidden" }}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
