import styled from "styled-components";

export const SwitchContainer = styled.div`
  width: 55px;
  height: 26px;
  border-radius: 20px;
  background: ${({ isActive }) => (isActive ? '#007BFF' : '#CED4DA')};
  display: flex;
  align-items: center;
  padding: 2px;
  cursor: pointer;
`;

export const Slider = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ffffff;
  transform: translateX(${({ isActive }) => (isActive ? '29px' : '2px')});
  transition: transform 0.3s ease-in-out;
`;