import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { CoinNameRouteTitle, CoinPlaceContainer, CoinPlaceTitle, Container, RouteTitle, SymbolContainer, SymbolTitle, Title } from './styles';

import FavoriteIcon from "../../assets/favorite-icon.svg";

import { getFavorites } from '../../utils/favoritesStorage';
import { formatMoney } from '../../utils/formatters';

function InfoCoin() {
  const location = useLocation();
  const coin = location.state.coin;
  const coinPlace = location.state.coinPlace;
  const firstPlaceCoin = location.state.firstPlaceCoin;
  const favorites = getFavorites();

  useEffect(() => {

  }, []);

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5, marginBottom: "2.5%" }}>
        <RouteTitle>Criptomoedas {">"} Moedas {">"}</RouteTitle>
        <CoinNameRouteTitle>{coin.name}</CoinNameRouteTitle>
      </div>

      <div style={{ display: 'flex', width: "100%", flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
          <div style={{ display: 'flex', height: '9vh', flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <img src={coin.image} alt="coin-icon" style={{ width: 32, height: 32 }} />
            <Title>{coin.name}</Title>
            <SymbolContainer>
              <SymbolTitle>{coin.symbol.toUpperCase()}</SymbolTitle>
            </SymbolContainer>
            <div style={{ cursor: 'pointer' }}>
              <img src={FavoriteIcon} alt="favorite-icon" style={{ width: 30, height: 30 }} />
            </div>
          </div>
          
          <CoinPlaceContainer>
            <CoinPlaceTitle>Classificação #{coinPlace}</CoinPlaceTitle>
          </CoinPlaceContainer>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <RouteTitle>Preço de {coin.name} ({coin.symbol.toUpperCase()})</RouteTitle>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
            <Title>{formatMoney(coin.current_price)}</Title>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default InfoCoin;
