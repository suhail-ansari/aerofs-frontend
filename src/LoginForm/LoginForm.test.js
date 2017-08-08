import React from 'react';
import LoginForm from './index';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

describe('<LoginForm />', () => {
  test('should initialize', () => {
    let onNameEnter = jest.fn();

    let tree = shallow(
      <LoginForm onNameEnter={onNameEnter} />
    )

    let form = tree.find('form');
    let input = tree.find('input');
    let button = tree.find('button');

    expect(form).toBeDefined();
    expect(input).toBeDefined();
    expect(button).toBeDefined();

    form.simulate('submit', { preventDefault: () => { } });
    expect(onNameEnter.mock.calls.length).toEqual(0);

    input.simulate('change', { target: { value: 'Suhail' } });
    form.simulate('submit', { preventDefault: () => { } });
    expect(onNameEnter.mock.calls.length).toEqual(1);

  });
});