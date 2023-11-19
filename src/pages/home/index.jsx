import { useEffect, useState } from "react";
import CryptoTable from "../../components/CryptoTable";
import CustomSwitch from "../../components/CustomSwitch";
import FavoriteCard from "../../components/FavoriteCard";
import { Container, HighlightsTitle, PriceTitle } from "./styles";

function Home() {
  const [coinList, setCoinList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  function getFavoriteList(favorites) {

  }

  useEffect(() => {
    
  });

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "2.5%", marginBottom: "3%", alignItems: "center", justifyContent: "space-between" }}>
          <PriceTitle style={{ fontSize: 28, fontFamily: "Inter" }}>Preço das criptomoedas por valor de mercado</PriceTitle>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <HighlightsTitle>Highlights</HighlightsTitle>
            <CustomSwitch />
          </div>
        </div>

        <p style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 16, color: "#000000" }}>
          Favoritos
        </p>

        <CryptoTable favorites={favorites} setFavorites={setFavorites} />
    </Container>
  );
}

export default Home;
