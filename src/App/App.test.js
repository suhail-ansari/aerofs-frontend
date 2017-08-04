import React from 'react';
import renderer from 'react-test-renderer';
import App from './index';

global.fetch = jest.fn(() => new Promise(resolve => resolve()));

test('should initialize', () => {
  let tree = renderer.create(
    <App/>
  );
  expect(tree).toMatchSnapshot();
});