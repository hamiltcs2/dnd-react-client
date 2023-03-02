import styled, { css, keyframes } from 'styled-components';

export const NavContainer = styled.div`
    &::after {
        content: '';
        display: table;
        clear: both;
    }
`;

export const AppLogo = styled.img`
    width: 85px;
    pointer-events: none;
    float: left;
    padding: 10px 0;
    position: absolute;
    @media (prefers-reduced-motion: no-preference) {
        ${props => props.animation && css`
            animation: spinner infinite 20s linear;
        `}
    }
`;
const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const Bars = styled.div`
    font-size: 18px;
    cursor: pointer;
    display: none;
    position: absolute;
    right: 10px;
    top: 7px;
    padding: 5px;
    // font-size: 18px;
`;
export const Nav = styled.nav`
    float: right;
    background-color: #93032E;
`;
export const List = styled.ul`
    list-style-type: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;
export const Items = styled.li`
    margin: 0 20px;
    font-size: 20px;
`;