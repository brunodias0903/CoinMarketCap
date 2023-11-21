import CryptoTable from "../../components/CryptoTable";
import CustomSwitch from "../../components/CustomSwitch";
import { Container, HighlightsTitle, PriceTitle } from "./styles";

function Home(props) {
  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "2.5%", marginBottom: "3%", alignItems: "center", justifyContent: "space-between" }}>
          <PriceTitle>Preço das criptomoedas por valor de mercado</PriceTitle>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <HighlightsTitle>Highlights</HighlightsTitle>
            <CustomSwitch />
          </div>
        </div>

        <CryptoTable searchValue={props.searchValue} setSearchValue={props.setSearchValue} />
    </Container>
  );
}

export default Home;
