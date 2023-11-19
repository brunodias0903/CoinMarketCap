import { Container, InfoContainer, MoneyText, Title } from "./styles";
import starIcon from "../../assets/star-icon.svg";

const FavoriteCard = (props) => {
  const { place, title, money, percent } = props;

  return (
    <Container>
      <Title style={{ fontSize: 40 }}>
        {place}
      </Title>
      <img src={starIcon} alt="" style={{ width: 24, height: 24, marginRight: 31 }} />

      <InfoContainer>
        <div style={{ height: 36 }}>
          <Title style={{ fontSize: 28, fontFamily: "IBM Plex Mono", fontWeight: 700 }}>
            {title}
          </Title>
        </div>
        <div style={{ height: 19, marginTop: 4 }}>
          <MoneyText style={{ color: "#A7B1C2" }}>
            {money}
          </MoneyText>
        </div>
        <div style={{ height: 19, marginTop: 8 }}>
          <MoneyText style={{ color: "#16C784" }}>
            {percent}
          </MoneyText>
        </div>
      </InfoContainer>
    </Container>
  );
}

export default FavoriteCard;