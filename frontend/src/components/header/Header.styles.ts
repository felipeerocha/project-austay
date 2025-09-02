import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    padding: 1.6rem 2.4rem;
    width: 100vw;
    border-style: solid;
    border-bottom-width: 1;

    ${({theme}) => css`
        background-color: ${theme.colors.background};
        border-color: ${theme.colors.border};
    `}
`