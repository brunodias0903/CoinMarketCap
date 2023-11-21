import React, { useEffect, useState } from "react";

import axios from "axios";
import ReactLoading from 'react-loading';

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

import { ReactComponent as CrescentArrow } from "../../assets/negative_arrow.svg";
import { ReactComponent as DecrescentArrow } from "../../assets/positive_arrow.svg";

import PositiveArrow from "../../assets/positive_arrow.svg";
import NegativeArrow from "../../assets/negative_arrow.svg";
import FavoriteMarked from "../../assets/favorite_marked.svg";
import FavoriteUnmarker from "../../assets/favorite_unmarked.svg";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CryptoTable = (props) => {
  const navigate = useNavigate();
  
  const baseUrl = "https://api.coingecko.com/api/v3";
  const requisitionUrl =
    "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h%2C7d&locale=en";

  const searchRequisitionUrl = `search/?query=${props.searchValue}`;

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchResponse, setSearchResponse] = useState(null);

  const [favorites, setFavorites] = useState([]);

  const [topCoinList, setTopCoinList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const [order, setOrder] = useState(true);

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
    var cloudFavorite = getFavorites();
    setFavorites(cloudFavorite);

    await axios
      .get(`${baseUrl}/${requisitionUrl}`)
      .then((res) => {
        [res].forEach((item) => {
          item["checkbox"] = false;
        });

        setResponse(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
  }

  async function fetchSearchData() {
    setLoading(true);

    await axios
      .get(`${baseUrl}/${searchRequisitionUrl}`)
      .then((res) => {
        setSearchResponse(res);

        var searchListUpdated = [];

        res.data.coins.forEach((searchCrypto) => {
          response.data.forEach((responseCrypto) => {
            if (responseCrypto.name === searchCrypto.name) {
              searchListUpdated.push(responseCrypto);
            }
          });
        });

        setSearchList(searchListUpdated);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    if (props.searchValue === "") {
      if (response === null) {
        fetchData();
      } else {
        const sortCoins = response.data.sort(
          (a, b) => b.current_price - a.current_price
        );
        const topTenCoins = sortCoins.slice(0, 10);

        if (props.searchValue === "") {
          favorites.forEach((favorite) => {
            topTenCoins.forEach((coin) => {
              if (favorite?.id === coin?.id) {
                coin.checkbox = favorite.checkbox;
              }
            });
          });
        }

        setTopCoinList(topTenCoins);
        setLoading(false);
      }
    } else {
      fetchSearchData();
    }
  }, [response, props.searchValue]);

  useEffect(() => {
    if (props.searchValue !== "") {
      fetchSearchData();
    } else {
      setResponse(null);
    }
  }, [props.searchValue]);

  useEffect(() => {
    if (searchResponse) {
      var searchListUpdated = [];

      searchResponse.data.coins.forEach((searchCrypto) => {
        response.data.forEach((responseCrypto) => {
          if (responseCrypto.name === searchCrypto.name) {
            searchListUpdated.push(responseCrypto);
          }
        });
      });

      setSearchList(searchListUpdated);
    }
  }, [searchResponse]);

  useEffect(() => {
    if (error !== "") {
      notify();
      setError("");
    }
  }, [error, notify]);

  function tableRowReturn(crypto, index, flag) {
    return <TableRow
      key={crypto.id}
    >
      <TableCell>
        {flag ? <div onClick={() => checkboxChange(index)} style={{ display: "flex", width: 24, height: 24, alignItems: "center", justifyContent: "center" }}>
          <img src={crypto["checkbox"] ? FavoriteMarked : FavoriteUnmarker} alt="" style={{ width: 24, height: 24 }} />
        </div> : <></>}
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
          <BuyButton style={{ marginLeft: 12 }} onClick={() => {
            if (!flag) {
              setResponse(null);
              props.setSearchValue("");
              navigate("/info_coin", { state: { coin: crypto } });
            }
          }}>Buy</BuyButton>
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
  }

  if (loading) {
    return (
      <div style={{ display: "flex", width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
        <ReactLoading type="spin" color="#000" height={'12%'} width={'12%'} />
      </div>
    );
  }

  if (props.searchValue !== "") {
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
                <TableHeader>
                  <div
                    onClick={() => setOrder(!order)}
                    style={{
                      display: "flex",
                      gap: 3,
                      flexDirection: "row",
                      alignItems: "center",
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
                      #
                    </p>
                    {order ? <CrescentArrow fill="#000" /> : <DecrescentArrow fill="#000" />}
                  </div>
                </TableHeader>
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
              {order ? searchList.map((crypto, index) => {
                return tableRowReturn(crypto, index, false);
              }) : searchList.toReversed().map((crypto, index) => {
                const place = searchList.length - index;
                return tableRowReturn(crypto, place - 1, false)
              })}
            </tbody>
          </Table>
        </TableContainer>
      </>
    );
  }

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
              <TableHeader>
                <div
                  onClick={() => setOrder(!order)}
                  style={{
                    display: "flex",
                    gap: 3,
                    flexDirection: "row",
                    alignItems: "center",
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
                    #
                  </p>
                  {order ? <CrescentArrow fill="#000" /> : <DecrescentArrow fill="#000" />}
                </div>
              </TableHeader>
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
            {order ? topCoinList.map((crypto, index) => {
              return tableRowReturn(crypto, index, true);
            }) : topCoinList.toReversed().map((crypto, index) => {
              const place = topCoinList.length - index;
              return tableRowReturn(crypto, place - 1, true);
            })}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CryptoTable;
