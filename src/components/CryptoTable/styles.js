import styled from 'styled-components';

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
  height: 72px;

  border-bottom: 1px solid #000;
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