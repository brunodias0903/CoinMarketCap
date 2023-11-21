import styled from "styled-components";
import { deviceMin } from "../../utils/responsive";

export const GitInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 320px;
  height: 120px;

  padding: 24px;

  box-sizing: border-box;

  align-items: start;
  justify-content: space-between;

  border-radius: 8px;
  border: 1px solid #E5E5E5;
  background: #FFF;

  @media ${deviceMin.laptop} {
    width: 280px;
  }
`;

export const GitInfoCardTitle = styled.span`
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

export const GitInfoCardValue = styled.span`
  color: #1E3146;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @media ${deviceMin.laptop} {
    font-size: 38px;
  }
`;