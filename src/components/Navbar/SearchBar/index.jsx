import { SearchBarContainer, SearchBarInput } from "./styles";
import searchIcon from "../../../assets/search-icon.svg";
import { HeaderItemText } from "../styles";

function SearchBar(props) {
  return (
    <SearchBarContainer>
      <img src={searchIcon} alt="" style={{ width: 16, height: 16, paddingLeft: 12, paddingRight: 8 }} />

      <SearchBarInput placeholder="Buscar" onChange={(e) => {props.setSearchValue(e.target.value)}} />

      <div style={{ display: "flex", width: 20, height: 20, background: "#A7B1C2", borderRadius: 4, alignItems: "center", justifyContent: "center" }}>
        <HeaderItemText style={{ color: "#FFFFFF", fontSize: 14 }}>/</HeaderItemText>
      </div>
    </SearchBarContainer>
  );
}

export default SearchBar;