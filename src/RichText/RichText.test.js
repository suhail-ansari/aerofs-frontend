import React from 'react';
import { shallow } from 'enzyme';
import RichText from './index.js';

describe('<RichText />', () => {
  test('should initialize and display a link', () => {
    const text = 'Hello, how are you. Please go to http://google.com';
    const tree = shallow(
      <RichText>{text}</RichText>
    );
    expect(tree.find('a').length).toEqual(1);
  });
});