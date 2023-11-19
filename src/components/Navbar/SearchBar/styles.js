import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;

  width: 175px;
  height: 40px;

  border-radius: 8px;
  background: #EFF2F5;
  box-shadow: 5px 15px 30px 0px rgba(126, 126, 177, 0.10);

  align-items: center;
`;

export const SearchBarInput = styled.input`
  width: 60%;
  background-color: transparent;
  border: none;

  color: black;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:focus {
        outline: none;
    }
`;