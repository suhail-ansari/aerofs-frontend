import React from 'react';

const urlRegEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

const parseText = (text) => {
  let tokens = text.split(urlRegEx);
  for (let i = 1; i < tokens.length; i += 2) {
    tokens[i] = <a key={'link-' + i} target="_blank" href={tokens[i]}>{tokens[i]}</a>
  }
  return tokens;
}

export default ({ children }) => {
  let text = parseText(children);
  return (
    <p >{text}</p>
  )
}