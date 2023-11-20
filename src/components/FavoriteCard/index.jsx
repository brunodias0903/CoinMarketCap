import { Container, InfoContainer, MoneyText, Title } from "./styles";
import starIcon from "../../assets/star-icon.svg";
import negativeArrow from "../../assets/negative_arrow.svg";
import positiveArrow from "../../assets/positive_arrow.svg";

const FavoriteCard = (props) => {
  const { place, title, money, percent } = props;

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row", gap: 5, marginRight: 12, alignItems: "center" }}>
        <Title style={{ fontSize: 40 }}>
          {place}
        </Title>
        <img src={starIcon} alt="" style={{ width: 24, height: 24 }} />
      </div>

      <InfoContainer>
        <div style={{
          display: "flex", 
          flexDirection: "row",
          gap: 3,
          boxSizing: "border-box",
          height: 19,
          alignItems: "center",
          justifyItems: "center",
        }}>
          <Title style={{ fontSize: 28, fontFamily: "IBM Plex Mono", fontWeight: 700 }}>
            {title}
          </Title>
          <img
            src={percent && percent?.includes("+") ? positiveArrow : negativeArrow}
            alt=""
            style={{ width: 9, height: 13 }}
          />
        </div>
        <div style={{ height: 19 }}>
          <MoneyText style={{ color: "#A7B1C2" }}>
            {money}
          </MoneyText>
        </div>
        <div style={{ height: 19 }}>
          <MoneyText style={{ color: percent?.includes("+") ? "#16C784" : "#EA3943" }}>
            {percent}
          </MoneyText>
        </div>
      </InfoContainer>
    </Container>
  );
}

export default FavoriteCard;