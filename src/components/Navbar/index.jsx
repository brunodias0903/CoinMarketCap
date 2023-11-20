import { Container, HeaderItemContainer, HeaderItemText, LoginSearchContainer, LogoImage, LogoItemsContainer, SignInButton } from "./styles";
import logoSvg from "../../assets/navbar-logo.svg";
import notificationIcon from "../../assets/notification-point.svg";
import diamondIcon from "../../assets/diamond.svg";
import SearchBar from "./SearchBar";

function Navbar(props) {
  const headerItems = [
    { title: "Cryptocurrencies", hasNotification: false },
    { title: "Exchanges", hasNotification: false },
    { title: "NFT", hasNotification: false },
    { title: "CryoTown", hasNotification: true },
    { title: "Portifolio", hasNotification: false },
    { title: "WatchList", hasNotification: false },
    { title: "Products", hasNotification: false },
  ];

  return (
    <Container>
      <LogoItemsContainer>
        <LogoImage src={logoSvg} alt="" />

        <HeaderItemContainer style={{ display: "flex", gap: 15 }}>
          {headerItems.map((item, index) => {
            return (
              <div style={{ display: "flex", flexDirection: "row", marginLeft: index === 0 ? 23 : 0, alignItems: "start", justifyContent: "center", }}>
                <HeaderItemText>{item.title}</HeaderItemText>
                {item.hasNotification ? <img src={notificationIcon} alt="" style={{ width: 12, height: 12 }} /> : <></>}
              </div>
            );
          })}
        </HeaderItemContainer>
      </LogoItemsContainer>

      <LoginSearchContainer>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img src={diamondIcon} alt="" style={{ width: 22.5, height: 20 }} />
          <HeaderItemText style={{ marginLeft: 8 }}>Log In</HeaderItemText>
        </div>

        <SignInButton style={{ marginLeft: 25, marginRight: 12 }} >
          <HeaderItemText style={{ color: "#FFFFFF" }}>
            Sign Up
          </HeaderItemText>
        </SignInButton>

        <SearchBar setSearchValue={props.setSearchValue} />
      </LoginSearchContainer>
    </Container>
  );
}

export default Navbar;