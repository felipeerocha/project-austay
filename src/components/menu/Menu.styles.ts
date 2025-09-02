import { Link, NavLink } from "react-router";
import styled, { css } from "styled-components";
import { Icon as AppIcon } from "../icon";


export const Label = styled.p`
    ${({theme}) => css`
        font-family: ${theme.font};
        font-size: ${theme.fontSize.p};
        font-weight: ${theme.fontWeight.medium};
        color: ${theme.colors.textSecondary};
    `}

`

export const Icon = styled(AppIcon)`
    ${({theme}) => css`
        color: ${theme.colors.textSecondary};
    `}
`

export const MenuItemContainer = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 1rem;
    text-decoration: none;
    border-radius: 0.8rem;
    padding: 1rem 1.6rem;

    ${({ theme }) => css`
        &:hover {
            ${Label}, ${Icon} {
                color: ${theme.colors.accentLavender};
            }
        }

        &.active {
            background-color: ${theme.colors.accentLavender};

            ${Label}, ${Icon} {
                color: ${theme.colors.accentWhite};
            }
        }
  `}
`
