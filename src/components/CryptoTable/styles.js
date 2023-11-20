import styled from 'styled-components';
import { deviceMin } from '../../utils/responsive';

export const TableContainer = styled.div`
  display: flex;

  width: 100%;
  height: 40%;

  margin-top: 7vh;

  overflow-y: auto;

  @media ${deviceMin.laptopL} {
    height: 45%;
  }

  @media ${deviceMin.desktop} {
    height: 50%;
  }
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: separate;
`;

export const TableHeader = styled.th`
  padding: 8px;
  text-align: ${({ align }) => align || 'left'};
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const TableRow = styled.tr`
  height: 70px;

  border-bottom: 0.5px solid #A7B1C2;

  @media ${deviceMin.desktop} {
    height: 75px;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
`;

export const FavButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
`;

export const CircleIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const InfoIcon = styled.span`
  font-size: 16px;
  color: #3C67F7;
  margin-left: 4px;
  cursor: pointer;
`;

export const BuyButton = styled.button`
  width: 43px;
  height: 31px;
  border-radius: 10px;
  background-color: #E7F0FF;
  color: #3C67F7;
  border: none;
  padding: 4px 8px;
  font-size: 16px;
  cursor: pointer;
`;

export const StarIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const ArrowIcon = styled.span`
  color: ${({ isPositive }) => (isPositive ? '#16C784' : '#EA3943')};
`;

export const StarCheckbox = styled.input`
  display: none;

  + label {
    cursor: pointer;
    padding: 0;
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 0.5px solid #a7b1c2;
    background-color: transparent;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  &:checked + label {
    background-color: #f6b87e;
    border: 0;
  }

  &:checked + label::before {
    content: '\2605'; /* Código Unicode para a estrela */
    font-size: 14px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const StarCheckboxWrapper = styled.div`
  display: inline-block;
  margin-right: 10px;
`;