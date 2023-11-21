import styled from "styled-components";
import { deviceMin } from "../../utils/responsive";

export const Container = styled.div`
  display: flex;

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

export const CoinNameOnTitle = styled.span`
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