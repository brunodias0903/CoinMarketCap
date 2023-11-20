import styled from "styled-components";
import { deviceMin } from "../../utils/responsive";

export const Container = styled.div`
  width: 100%;
  height: 90%;

  box-sizing: border-box;

  padding-left: 144px;
  padding-right: 144px;

  background: #f8fafd;
`;

export const PriceTitle = styled.span`
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

export const HighlightsTitle = styled.p`
  color: #A7B1C2;

  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-right: 12px;

  @media ${deviceMin.desktop} {
    font-size: 16px;
  }
`;