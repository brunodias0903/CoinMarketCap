import React, { useEffect, useState } from "react";

//Libs
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
import axios from "axios";

//Styled Components
import {
  CoinNameRouteTitle,
  CoinPlaceContainer,
  CoinPlaceTitle,
  Container,
  PricePercentContainer,
  PricePercentText,
  RouteTitle,
  SymbolContainer,
  SymbolTitle,
  Title,
} from "./styles";

//Utils
import { getFavorites } from "../../utils/favoritesStorage";
import { formatMoney, slicePercentage } from "../../utils/formatters";

//Assets
import { ReactComponent as PositiveArrow } from "../../assets/positive_arrow.svg";
import { ReactComponent as NegativeArrow } from "../../assets/negative_arrow.svg";
import FavoriteIcon from "../../assets/favorite-icon.svg";

function InfoCoin() {
  const location = useLocation();
  const coin = location.state.coin;
  const coinPlace = location.state.coinPlace;
  const firstPlaceCoin = location.state.firstPlaceCoin;
  const favorites = getFavorites();

  const [priceAndPorcentageFirst, setPriceAndPorcentageFirst] = useState([]);
  const [priceAndPorcentageActual, setPriceAndPorcentageActual] = useState([]);

  const [loading, setLoading] = useState(false);

  const baseUrl = "https://api.coingecko.com/api/v3";

  const firstUrl = `coins/${firstPlaceCoin.id}`;
  const actualUrl = `coins/${coin.id}`;

  const fetchFirstInfo = async () => {
    setLoading(true);

    await axios
      .get(`${baseUrl}/${firstUrl}`)
      .then((res) => {
        setPriceAndPorcentageFirst([
          res.data.market_data.price_change_24h_in_currency.usd,
          res.data.market_data.price_change_percentage_24h,
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchActualInfo();
      });
  };

  const fetchActualInfo = async () => {
    await axios
      .get(`${baseUrl}/${actualUrl}`)
      .then((res) => {
        console.log(`LINK GITHUB: ${res.data.links.repos_url.github[0]}`);

        setPriceAndPorcentageActual([
          res.data.market_data.price_change_24h_in_currency.usd,
          res.data.market_data.price_change_percentage_24h,
          res.data.links.repos_url.github[0]
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFirstInfo();
  }, [coin, firstPlaceCoin]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactLoading type="spin" color="#000" height={"12%"} width={"12%"} />
      </div>
    );
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          marginBottom: "2.5%",
        }}
      >
        <RouteTitle>
          Criptomoedas {">"} Moedas {">"}
        </RouteTitle>
        <CoinNameRouteTitle>{coin.name}</CoinNameRouteTitle>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "9vh",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={coin.image}
              alt="coin-icon"
              style={{ width: 32, height: 32 }}
            />
            <Title>{coin.name}</Title>
            <SymbolContainer>
              <SymbolTitle>{coin.symbol.toUpperCase()}</SymbolTitle>
            </SymbolContainer>
            <div style={{ cursor: "pointer" }}>
              <img
                src={FavoriteIcon}
                alt="favorite-icon"
                style={{ width: 30, height: 30 }}
              />
            </div>
          </div>

          <CoinPlaceContainer>
            <CoinPlaceTitle>Classificação #{coinPlace}</CoinPlaceTitle>
          </CoinPlaceContainer>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <RouteTitle>
            Preço de {coin.name} ({coin.symbol.toUpperCase()})
          </RouteTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
            }}
          >
            <Title>{formatMoney(coin.current_price)}</Title>
            <PricePercentContainer
              style={{
                background:
                  coin.price_change_percentage_24h > 0 ? "#16C784" : "#EA3943",
              }}
            >
              {coin.price_change_percentage_24h > 0 ? (
                <PositiveArrow style={{ fill: "white", width: 9, height: 5 }} />
              ) : (
                <NegativeArrow style={{ fill: "white", width: 9, height: 5 }} />
              )}
              <PricePercentText>
                {slicePercentage(coin.price_change_percentage_24h)}
              </PricePercentText>
            </PricePercentContainer>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <RouteTitle style={{ fontWeight: 400 }}>
                  {priceAndPorcentageFirst[0]}
                </RouteTitle>
                <RouteTitle style={{ fontWeight: 400 }}>
                  {firstPlaceCoin.symbol.toUpperCase()}
                </RouteTitle>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                {priceAndPorcentageFirst[1] > 0 ? (
                  <PositiveArrow style={{ width: 9, height: 5 }} />
                ) : (
                  <NegativeArrow style={{ width: 9, height: 5 }} />
                )}

                <RouteTitle
                  style={{
                    fontWeight: 400,
                    color:
                      priceAndPorcentageFirst[1] > 0 ? "#16C784" : "#EA3943",
                  }}
                >
                  {slicePercentage(priceAndPorcentageFirst[1])}
                </RouteTitle>
              </div>
            </div>
            {firstPlaceCoin !== coin ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <RouteTitle style={{ fontWeight: 400 }}>
                    {priceAndPorcentageActual[0]}
                  </RouteTitle>
                  <RouteTitle style={{ fontWeight: 400 }}>
                    {coin.symbol.toUpperCase()}
                  </RouteTitle>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  {priceAndPorcentageActual[1] > 0 ? (
                    <PositiveArrow style={{ width: 9, height: 5 }} />
                  ) : (
                    <NegativeArrow style={{ width: 9, height: 5 }} />
                  )}

                  <RouteTitle
                    style={{
                      fontWeight: 400,
                      color:
                        priceAndPorcentageActual[1] > 0 ? "#16C784" : "#EA3943",
                    }}
                  >
                    {slicePercentage(priceAndPorcentageActual[1])}
                  </RouteTitle>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default InfoCoin;
