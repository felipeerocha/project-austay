import styled, { css } from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 

  overflow: hidden;
`

export const AppBody = styled.div`
  flex: 1 1 auto;       
  min-height: 0;        
  display: flex;       
`

export const MainContent = styled.main`
  min-width: 0;         
  min-height: 0;     
  overflow: auto;       
  padding: 3.2rem;
	width: 100%;

	${({theme}) => css`
    background-color: ${theme.colors.backgroundMedium};
    border-color: ${theme.colors.border};
  `}

`