import React, { useEffect, useState } from "react";
import { ArrowIcon, BuyButton, CircleIcon, InfoIcon, StarCheckbox, StarCheckboxWrapper, StarIcon, Table, TableCell, TableContainer, TableHeader, TableRow } from "./styles";
import favoriteMarked from "../../assets/favorite_marked.svg";
import favoriteUnmarked from "../../assets/favorite_unmarked.svg";
import useAxios from "../../hooks/useAxios";
import FavoriteCard from "../FavoriteCard";
import { getFavorites, saveFavorites } from "../../utils/favoritesStorage";

const CryptoTable = (props) => {
  const { response } = useAxios('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d&locale=en');
  const [favorites, setFavorites] = useState([]);

  const [topCoinList, setTopCoinList] = useState([]);

  useEffect(() => {
    const localStorageList = getFavorites();

    if (localStorageList) {
      setFavorites(localStorageList);
    }
  }, []);

  function isFavorite(id) {
    favorites.forEach((item) => {
      if (item.id === id) {
        return true;
      }
    });

    return false;
  }

  const toggleFavorite = (crypto) => {
    var isFavorite = false;

    favorites.forEach((item) => {
      if (item.id === crypto.id) {
        isFavorite = true;
      }
    });

    if (isFavorite) {
      setFavorites(favorites.filter((item) => item.id !== crypto.id));
    } else {
      setFavorites([...favorites, crypto]);
    }

    saveFavorites(favorites);
  };

  function formatMoney(value) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(value);
  }

  function slicePercentage(num) {
    if (num > 0) {
      return `${num.toString().slice(0, 3)}%`;
    } else {
      return `${num.toString().slice(0, 4)}%`;
    }
  }

  function cardPercentage(num) {
    if (num > 0) {
      return `+${num.toString().slice(0, 4).replace(".", ",")}%`;
    } else {
      return `${num.toString().slice(0, 5).replace(".", ",")}%`;
    }
  }

  useEffect(() => {
    if (response) {
      const sortCoins = response.sort((a, b) => b.current_price - a.current_price);
      const topTenCoins = sortCoins.slice(0, 10);

      setTopCoinList(topTenCoins);
    }
  }, [response]);

  return (
    <>
      {favorites.length !== 0 && <p style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 16, color: "#000000" }}>
        Favoritos
      </p>}
      <div style={{ width: "100%", gap: 30, display: "flex", flexDirection: "row", overflowX: "auto", whiteSpace: "nowrap" }}>
        {favorites.map((item, index) => (
          <FavoriteCard
            place={index + 1}
            title={(item.symbol).toUpperCase()}
            money={formatMoney(item.current_price)}
            percent={cardPercentage(item.price_change_percentage_24h_in_currency)}
          />
        ))}
      </div>
      <TableContainer>
        <Table style={{ borderCollapse: "collapse" }}>
          <thead>
            <TableRow>
              <TableHeader style={{ width: "40px" }}></TableHeader>
              <TableHeader >#</TableHeader>
              <TableHeader align="left">Nome</TableHeader>
              <TableHeader align="right">Preço</TableHeader>
              <TableHeader align="right">24h %</TableHeader>
              <TableHeader align="right">7d %</TableHeader>
              <TableHeader align="right">
                Valor de Mercado
                <InfoIcon>ℹ️</InfoIcon>
              </TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {topCoinList.map((crypto, index) => {
              return <TableRow key={crypto.id}>
                <TableCell>
                  {/* <div onClick={() => toggleFavorite(crypto)}>
                    {isFavorite(crypto.id)}
                  </div> */}

                  <StarCheckboxWrapper>
                    <StarCheckbox
                      type="checkbox"
                      id="starCheckbox"
                      checked={isFavorite(crypto.id)}
                      onChange={toggleFavorite(crypto.id)}
                    />
                    <label htmlFor="starCheckbox" />
                  </StarCheckboxWrapper>

                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", width: "60%", flexDirection: "row", alignItems: "center", justifyContent: "" }}>
                    <CircleIcon src={crypto.image} alt="" />
                    <p style={{
                      color: "#000",
                      fontFamily: "Inter",
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      marginLeft: 8,
                    }}>{crypto.name}</p>
                    <p style={{ color: "#A7B1C2", fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: 400, lineHeight: "normal", marginLeft: 8 }}>
                      {(crypto.symbol).toUpperCase()}
                    </p>
                    <BuyButton style={{ marginLeft: 12 }}>Buy</BuyButton>
                  </div>
                </TableCell>
                <TableCell>
                  <p style={{
                    color: "#000",
                    textAlign: "right",
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}>{formatMoney(crypto.current_price)}</p>
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <ArrowIcon isPositive={crypto.price_change_percentage_24h_in_currency >= 0 ? true : false}>{crypto.price_change_percentage_24h_in_currency >= 0 ? '↑' : '↓'}</ArrowIcon>
                    <span style={{ textAlign: "right", color: crypto.price_change_percentage_24h_in_currency >= 0 ? '#16C784' : '#EA3943' }}>{slicePercentage(crypto.price_change_percentage_24h_in_currency)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <ArrowIcon isPositive={crypto.price_change_percentage_7d_in_currency >= 0 ? true : false}>{crypto.price_change_percentage_7d_in_currency >= 0 ? '↑' : '↓'}</ArrowIcon>
                    <span style={{ color: crypto.price_change_percentage_7d_in_currency >= 0 ? '#16C784' : '#EA3943' }}>{slicePercentage(crypto.price_change_percentage_7d_in_currency)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p style={{
                    color: "#000",
                    textAlign: "right",
                    fontFamily: "Inter",
                    fontSize: 16,
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "normal",
                  }}>{formatMoney(crypto.market_cap)}</p>
                </TableCell>
              </TableRow>
            })}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CryptoTable;