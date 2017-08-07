import React from 'react';
import { shallow } from 'enzyme';
import MessageInput from './index';

describe('<MessageInput />', () => {

  test('should initialize', () => {
    let text = "hello";
    let onInputChange = jest.fn();
    let onSendMessage = jest.fn();

    let wrapper = shallow(
      <MessageInput
        text={text}
        onInputChange={onInputChange}
        onSendMessage={onSendMessage}/>
    );

    let form = wrapper.find('form');
    let input = wrapper.find('input');
    let button = wrapper.find('button');

    expect(input.props().value).toEqual("hello");

    input.simulate('change');
    expect(onInputChange.mock.calls.length).toEqual(1);

    form.simulate('submit', { preventDefault: () => {}});
    expect(onSendMessage.mock.calls.length).toEqual(1);
  });
});