import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  height: 118px;

  display: flex;
  flex-direction: row;
  
  padding-left: 30px;
  padding-right: 30px;

  box-sizing: border-box;

  border-radius: 8px;
  border: 1px solid #e5e5e5;
  background: #FFFFFF;

  align-items: center;
`;

export const Title = styled.h1`

  color: #1E3146;
  text-align: center;
  font-family: Inter;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const InfoContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
`;

export const MoneyText = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;