import React, { useEffect, useState } from "react";

//Components
import FavoriteCard from "../FavoriteCard";

//LocalStorage
import { getFavorites, saveFavorites } from "../../utils/favoritesStorage";

//Formatters
import {
  cardPercentage,
  formatMoney,
  slicePercentage,
} from "../../utils/formatters";

//Styled Components
import {
  BackgroundInfo,
  BuyButton,
  CircleIcon,
  InfoText,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "./styles";

import axios from "axios";

import PositiveArrow from "../../assets/positive_arrow.svg";
import NegativeArrow from "../../assets/negative_arrow.svg";
import { ToastContainer, toast } from "react-toastify";

const CryptoTable = (props) => {
  const baseUrl = "https://api.coingecko.com/api/v3";
  const requisitionUrl =
    "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d&locale=en";

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState([]);

  const [topCoinList, setTopCoinList] = useState([]);

  const notify = () => toast(error);

  function checkboxChange(index) {
    var actualTopCoinList = topCoinList;
    var newFavoriteList = [];

    actualTopCoinList[index]["checkbox"] =
      !actualTopCoinList[index]["checkbox"];

    actualTopCoinList.forEach((item) => {
      if (item["checkbox"]) {
        newFavoriteList.push(item);
      }
    });

    setFavorites(newFavoriteList);
    saveFavorites(newFavoriteList);
  }

  async function fetchData() {
    setLoading(true);

    var cloudFavorite = getFavorites();
    setFavorites(cloudFavorite);

    await axios
      .get(`${baseUrl}/${requisitionUrl}`)
      .then((res) => {
        [res].forEach((item) => {
          console.log("ID: ", item?.id);
          cloudFavorite.forEach((favoriteCoin) => {
            if (favoriteCoin?.id === item?.id) {
              console.log(`ID: ${favoriteCoin?.id}: ${favoriteCoin?.checkbox}`);
              item["checkbox"] = favoriteCoin?.checkbox;
            } else {
              item["checkbox"] = false;
            }
          });
        });

        setResponse(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (response == null) {
      fetchData();
    } else {
      const sortCoins = response.data.sort(
        (a, b) => b.current_price - a.current_price
      );
      const topTenCoins = sortCoins.slice(0, 10);

      setTopCoinList(topTenCoins);
    }
  }, [response]);

  useEffect(() => {
    if (error !== "") {
      notify();
      setError("");
    }
  }, [error, notify]);

  return (
    <>
      <ToastContainer />
      {favorites.length !== 0 && (
        <p
          style={{
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 16,
            color: "#000000",
          }}
        >
          Favoritos
        </p>
      )}
      <div
        style={{
          width: "100%",
          gap: 30,
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {favorites.map((item, index) => (
          <FavoriteCard
            place={index + 1}
            title={item?.symbol.toUpperCase()}
            money={formatMoney(item?.current_price)}
            percent={cardPercentage(
              item?.price_change_percentage_24h_in_currency
            )}
          />
        ))}
      </div>
      <TableContainer>
        <Table style={{ borderCollapse: "collapse" }}>
          <thead>
            <TableRow>
              <TableHeader style={{ width: "40px" }}></TableHeader>
              <TableHeader>#</TableHeader>
              <TableHeader align="left">Nome</TableHeader>
              <TableHeader align="right">Preço</TableHeader>
              <TableHeader align="right">24h %</TableHeader>
              <TableHeader align="right">7d %</TableHeader>
              <TableHeader align="right">
                <div
                  style={{
                    display: "flex",
                    gap: 3,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <p
                    style={{
                      color: "#000",
                      textAlign: "right",
                      fontFamily: "Inter",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "normal",
                    }}
                  >
                    Valor de Mercado
                  </p>

                  <BackgroundInfo>
                    <InfoText>i</InfoText>
                  </BackgroundInfo>
                </div>
              </TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {topCoinList.map((crypto, index) => {
              return (
                <TableRow key={crypto.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={crypto["checkbox"]}
                      onChange={() => checkboxChange(index)}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        width: "60%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "",
                      }}
                    >
                      <CircleIcon src={crypto.image} alt="" />
                      <p
                        style={{
                          color: "#000",
                          fontFamily: "Inter",
                          fontSize: 16,
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "normal",
                          marginLeft: 8,
                        }}
                      >
                        {crypto.name}
                      </p>
                      <p
                        style={{
                          color: "#A7B1C2",
                          fontFamily: "Inter",
                          fontSize: 16,
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                          marginLeft: 8,
                        }}
                      >
                        {crypto.symbol.toUpperCase()}
                      </p>
                      <BuyButton style={{ marginLeft: 12 }}>Buy</BuyButton>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p
                      style={{
                        color: "#000",
                        textAlign: "right",
                        fontFamily: "Inter",
                        fontSize: 16,
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      {formatMoney(crypto.current_price)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        gap: 3,
                        justifyContent: "end",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={
                          crypto.price_change_percentage_24h_in_currency >= 0
                            ? PositiveArrow
                            : NegativeArrow
                        }
                        alt=""
                        style={{ width: 9, height: 13 }}
                      />
                      <span
                        style={{
                          textAlign: "right",
                          color:
                            crypto.price_change_percentage_24h_in_currency >= 0
                              ? "#16C784"
                              : "#EA3943",
                        }}
                      >
                        {slicePercentage(
                          crypto.price_change_percentage_24h_in_currency
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        gap: 3,
                        justifyContent: "end",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={
                          crypto.price_change_percentage_7d_in_currency >= 0
                            ? PositiveArrow
                            : NegativeArrow
                        }
                        alt=""
                        style={{ width: 9, height: 13 }}
                      />
                      <span
                        style={{
                          color:
                            crypto.price_change_percentage_7d_in_currency >= 0
                              ? "#16C784"
                              : "#EA3943",
                        }}
                      >
                        {slicePercentage(
                          crypto.price_change_percentage_7d_in_currency
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p
                      style={{
                        color: "#000",
                        textAlign: "right",
                        fontFamily: "Inter",
                        fontSize: 16,
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                      }}
                    >
                      {formatMoney(crypto.market_cap)}
                    </p>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CryptoTable;
