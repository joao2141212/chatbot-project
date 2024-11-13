// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Adicione estilos globais adicionais aqui */
`;

export default GlobalStyles;
