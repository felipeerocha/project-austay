import styled, { css } from "styled-components";

export const AsideContainer = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2.4rem;
    padding-top: 2.4rem;
    width: fit-content;
    height: 100%;
    justify-content: space-between;

    ${({theme}) => css`
        background-color: ${theme.colors.background};
    `}
`

export const Content = styled.div`
    width: 100%;
`

export const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.6rem;
    width: 100%;
`

export const UserIconContainer = styled.div`
    width: 3.8rem;
    height: 3.8rem;
    border-radius: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
    ${({theme}) => css`
        background-color: ${theme.colors.accentBlue};
    `}

    p {
    ${({theme}) => css`
        font-family: ${theme.font};
        color: ${theme.colors.accentWhite};
        font-size: ${theme.fontSize.h5};
        font-weight: ${theme.fontWeight.bold};
    `}
    }
`

export const UserName = styled.p`
    ${({theme}) => css`
        font-family: ${theme.font};
        color: ${theme.colors.textSecondary};
        font-size: ${theme.fontSize.p};
        font-weight: ${theme.fontWeight.medium};
    `}
`

export const Divider = styled.div`
    margin-top: 3.2rem;
    margin-bottom: 2.4rem;
    height: 2px;
    width: 100%;
    ${({theme}) => css`
        background-color: ${theme.colors.border};
    `}

`