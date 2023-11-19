import React, { useEffect } from "react";
import { ArrowIcon, BuyButton, CircleIcon, InfoIcon, StarIcon, Table, TableCell, TableHeader, TableRow } from "./styles";
import favoriteMarked from "../../assets/favorite_marked.svg";
import favoriteUnmarked from "../../assets/favorite_unmarked.svg";
import useAxios from "../../hooks/useAxios";
import FavoriteCard from "../FavoriteCard";

const CryptoTable = (props) => {
  const { response } = useAxios('search/trending');

  const toggleFavorite = (id) => {
    const isFavorite = props.favorites.includes(id);
    if (isFavorite) {
      props.setFavorites(props.favorites.filter((favId) => favId !== id));
    } else {
      props.setFavorites([...props.favorites, id]);
    }
  };

  return (
    <>
      <div style={{ width: "100%", gap: 32, display: "flex", flexDirection: "row", overflowX: "auto", whiteSpace: "nowrap" }}>
        <FavoriteCard place="1" title="BTC" money="R$ 1.844,39" percent="+10,44%" />
        <FavoriteCard place="1" title="BTC" money="R$ 1.844,39" percent="+10,44%" />
        <FavoriteCard place="1" title="BTC" money="R$ 1.844,39" percent="+10,44%" />
        <FavoriteCard place="1" title="BTC" money="R$ 1.844,39" percent="+10,44%" />
        <FavoriteCard place="1" title="BTC" money="R$ 1.844,39" percent="+10,44%" />
      </div>
      <div style={{ display: "flex", height: "40%", overflowY: "scroll", marginTop: "7vh" }}>
        <Table>
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
            {response && response.coins.map((crypto, item) => (
              <TableRow key={crypto.item.coin_id}>
                <TableCell>
                  <div onClick={() => toggleFavorite(crypto.item.coin_id)}>
                    <StarIcon src={props.favorites.includes(crypto.item.coin_id) ? favoriteMarked : favoriteUnmarked} alt="" />
                  </div>
                </TableCell>
                <TableCell>{crypto.item.score + 1}</TableCell>
                <TableCell>
                  <div style={{ display: "flex", width: "60%", flexDirection: "row", alignItems: "center", justifyContent: "" }}>
                    <CircleIcon src={crypto.item.small} alt="" />
                    <p style={{
                      color: "#000",
                      fontFamily: "Inter",
                      fontSize: 16,
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "normal",
                      marginLeft: 8,
                    }}>{crypto.item.name}</p>
                    <p style={{ color: "#A7B1C2", fontFamily: "Inter", fontSize: 16, fontStyle: "normal", fontWeight: 400, lineHeight: "normal", marginLeft: 8 }}>
                      {crypto.item.symbol}
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
                  }}>${crypto.price}</p>
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <ArrowIcon isPositive={crypto.percent24h >= 0 ? true : false}>{crypto.percent24h >= 0 ? '↑' : '↓'}</ArrowIcon>
                    <span style={{ textAlign: "right", color: crypto.percent24h >= 0 ? '#16C784' : '#EA3943' }}>{crypto.percent24h}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <ArrowIcon isPositive={crypto.percent7d >= 0 ? true : false}>{crypto.percent7d >= 0 ? '↑' : '↓'}</ArrowIcon>
                    <span style={{ color: crypto.percent7d >= 0 ? '#16C784' : '#EA3943' }}>{crypto.percent7d}%</span>
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
                  }}>${crypto.marketCap}</p>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CryptoTable;