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
  GitInfoCardTitle,
  GitInfoCardValue,
  GitInfoContainer,
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
import GitInfoCard from "../../components/GitInfoCard";
import useAxios from "../../hooks/fetchData";
import useGhAxios from "../../hooks/fetchGitHubData";

function InfoCoin() {
  const location = useLocation();
  const coin = location.state.coin;
  const coinPlace = location.state.coinPlace;
  const firstPlaceCoin = location.state.firstPlaceCoin;
  const favorites = getFavorites();

  const firstUrl = `coins/${firstPlaceCoin.id}`;
  const actualUrl = `coins/${coin.id}`;

  const ghUserUrl = `users/${coin.id}`;
  const ghRepoUrl = `repos/${coin.id}/${coin.id}`;

  const firstResponse = useAxios({method: 'get',  url: firstUrl}).response;
  const firstError = useAxios({method: 'get', url: firstUrl}).error;
  const firstLoading = useAxios({method: 'get', url: firstUrl}).loading;

  const actualResponse = useAxios({method: 'get', url: actualUrl}).response;
  const actualError = useAxios({method: 'get',  url: actualUrl}).error;
  const actualLoading = useAxios({method: 'get',  url: actualUrl}).loading;

  const userGhResponse = useGhAxios({method: 'get', url: ghUserUrl}).response;
  const userGhError = useGhAxios({method: 'get', url: ghUserUrl}).error;
  const userGhLoading = useGhAxios({method: 'get', url: ghUserUrl}).loading;

  const repoGhResponse = useGhAxios({method: 'get', url: ghRepoUrl}).response;
  const repoGhError = useGhAxios({method: 'get', url: ghRepoUrl}).error;
  const repoGhLoading = useGhAxios({method: 'get', url: ghRepoUrl}).loading;

  //const gitHubUserResponse = useAxios({method: 'get', url: ''});

  const [firstData, setFirstData] = useState([]);

  const [actualData, setActualData] = useState([]);

  const [userGhData, setUserGhData] = useState(null);
  
  const [repoGhData, setRepoGhData] = useState([]);

  useEffect(() => {
    if (firstResponse !== null) {
      setFirstData([
        firstResponse?.market_data?.price_change_24h_in_currency?.usd,
        firstResponse?.market_data?.price_change_percentage_24h,
      ]);
    }
  }, [firstResponse]);

  useEffect(() => {
    if (actualResponse !== null) {
      setActualData([
        actualResponse?.market_data?.price_change_24h_in_currency?.usd,
        actualResponse?.market_data?.price_change_percentage_24h,
      ]);
    }
  }, [actualResponse]);

  useEffect(() => {
    if (userGhResponse !== null) {
      setUserGhData(userGhResponse?.followers);
    }
  }, [userGhResponse]);

  useEffect(() => {
    if (repoGhResponse) {
      setRepoGhData([
        repoGhResponse?.stargazers_count,
        repoGhResponse?.forks,
      ]);
    }
  }, [repoGhResponse]);

  if (firstLoading || actualLoading ) {
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
                  {firstData[0]}
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
                {firstData[1] > 0 ? (
                  <PositiveArrow style={{ width: 9, height: 5 }} />
                ) : (
                  <NegativeArrow style={{ width: 9, height: 5 }} />
                )}

                <RouteTitle
                  style={{
                    fontWeight: 400,
                    color:
                      firstData[1] > 0 ? "#16C784" : "#EA3943",
                  }}
                >
                  {slicePercentage(firstData[1])}
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
                    {actualData[0]}
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
                  {actualData[1] > 0 ? (
                    <PositiveArrow style={{ width: 9, height: 5 }} />
                  ) : (
                    <NegativeArrow style={{ width: 9, height: 5 }} />
                  )}

                  <RouteTitle
                    style={{
                      fontWeight: 400,
                      color:
                        actualData[1] > 0 ? "#16C784" : "#EA3943",
                    }}
                  >
                    {slicePercentage(actualData[1])}
                  </RouteTitle>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row", marginTop: "5%", gap: "7%", width: "100%", height: "120px", alignItems: "center", justifyContent: "center" }}>
        <GitInfoCard title="Followers" value={userGhData} />
        <GitInfoCard title="Stars" value={repoGhData[0]} />
        <GitInfoCard title="Forks" value={repoGhData[1]} />
      </div>
    </Container>
  );
}

export default InfoCoin;
