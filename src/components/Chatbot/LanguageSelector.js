// src/components/Chatbot/LanguageSelector.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Selector = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Selector value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
      <option value="pt">Português</option>
      <option value="en">English</option>
      <option value="es">Español</option>
      {/* Adicione mais opções de idioma conforme necessário */}
    </Selector>
  );
};

export default LanguageSelector;
