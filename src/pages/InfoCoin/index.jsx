import React, { useEffect } from 'react'
import { CoinNameOnTitle, Container, RouteTitle } from './styles'
import { useLocation } from 'react-router-dom';

function InfoCoin() {
  const location = useLocation();
  const coin = location.state.coin;

  useEffect(() => {

  }, []);

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
        <RouteTitle>Criptomoedas {">"} Moedas {">"}</RouteTitle>
        <CoinNameOnTitle>{coin.name}</CoinNameOnTitle>
      </div>

      
    </Container>
  )
}

export default InfoCoin;
