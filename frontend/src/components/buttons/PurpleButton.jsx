import styled, { css } from "styled-components";
import { Button } from "@mui/material";

export const PurpleButton = styled(Button).attrs({
  variant: "contained",
})`
  ${({ theme }) => css`
    && {
      background-color: ${theme.colors.accentLavender};
      color: ${theme.colors.accentWhite};
      font-weight: ${theme.fontWeight.bold};
      text-transform: none;

      &:hover {
        background-color: ${theme.colors.accentLavender};
        opacity: 0.9;
      }
    }
  `}
`;
