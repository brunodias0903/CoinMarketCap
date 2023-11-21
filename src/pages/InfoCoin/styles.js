import styled from "styled-components";
import { deviceMin } from "../../utils/responsive";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 90%;

  box-sizing: border-box;

  padding-left: 144px;
  padding-right: 144px;

  padding-top: 2.5%;

  background: #f8fafd;
`;

export const PageTitle = styled.span`
  color: #000;
  font-family: "Inter", sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media ${deviceMin.laptop} {
    font-size: 24px;
  }
`;

export const RouteTitle = styled.span`
  color: #A7B1C2;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media ${deviceMin.laptop} {
    font-size: 14px;
  }
`;

export const CoinNameRouteTitle = styled.span`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media ${deviceMin.laptop} {
    font-size: 14px;
  }
`;

export const Title = styled.h1`
  color: #000;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media ${deviceMin.laptop} {
    font-size: 36px;
  }
`;

export const SymbolContainer = styled.div`
  display: flex;

  padding: 8px 10px;

  border-radius: 8px;
  background: #EFF2F5;
  box-shadow: 5px 15px 30px 0px rgba(126, 126, 177, 0.10);

  box-sizing: border-box;

  align-items: center;
  justify-content: center;
`;

export const SymbolTitle = styled.span`
  color: #A7B1C2;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media ${deviceMin.laptop} {
    font-size: 10px;
  }
`;

export const CoinPlaceContainer = styled.div`
  display: flex;
  padding: 8px;
  align-items: flex-start;
  gap: 16px;

  border-radius: 8px;
  background: #80899C;
  box-shadow: 5px 15px 30px 0px rgba(126, 126, 177, 0.10);
`;

export const CoinPlaceTitle = styled.span`
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media ${deviceMin.laptop} {
    font-size: 14px;
  }
`;

export const PricePercentContainer = styled.div`
  display: flex;
  padding: 8px 10px 8px 24px;
  align-items: flex-start;
  gap: 16px;

  border-radius: 8px;
  background: #16C784;
  box-shadow: 5px 15px 30px 0px rgba(126, 126, 177, 0.10);
`;