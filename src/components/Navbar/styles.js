import styled from "styled-components";
import { deviceMin } from '../../utils/responsive';

export const Container = styled.div`
  display: flex;

  width: 100%;
  height: 10%;

  box-sizing: border-box;

  padding-left: 132px;
  padding-right: 145px;

  background-color: #FFFFFF;

  align-items: center;
  justify-content: space-between;
`;

export const NavItem = styled.li`
  cursor: pointer;

  font-family: "Inter", sans-serif;
  font-size: 12px;

  @media ${deviceMin.laptopL} {
    font-size: 14px;
  }

  @media ${deviceMin.desktop} {
    font-size: 16px;
  }
`;

export const LogoItemsContainer = styled.div`
  display: flex;
  
  flex-direction: row;
  justify-content: space-between;
`;

export const LogoImage = styled.img`
  width: 240px;

  @media ${deviceMin.laptop} {
    width: 180px;
  } 
`;

export const HeaderItemContainer = styled.div`
  display: flex;
  
  @media ${deviceMin.laptopL} {
    gap: 15px;
  }
  
  @media ${deviceMin.desktop} {
    gap: 30px;
  }
  
  @media ${deviceMin.desktopL} {
    gap: 40px;
  }
`;

export const HeaderItemText = styled.p`
  color: black;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;

  @media ${deviceMin.laptop} {
    font-size: 12px;
  } 
`;

export const LoginSearchContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

export const SignInButton = styled.div`
  display: flex;

  width: 91px;
  height: 40px;

  border-radius: 8px;
  background: #3C67F7;
  box-shadow: 5px 15px 30px 0px rgba(126, 126, 177, 0.10);

  align-items: center;
  justify-content: center;
`;