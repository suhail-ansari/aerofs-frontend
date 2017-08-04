import React from 'react';
import {shallow} from 'enzyme';
import MessageInput from './index';

test('should initialize', () => {
  let text = "hello";
  let changeHandler = jest.fn();
  let keyUpHandler = jest.fn();
  let sendHandler = jest.fn();
  
  let wrapper = shallow(
    <MessageInput
      text={ text }
      changeHandler={changeHandler}
      keyUpHandler={keyUpHandler}
      sendHandler={sendHandler}/>
  );
  
  let input = wrapper.find('input');
  let button = wrapper.find('button');

  expect(input.props().value).toEqual("hello");
  
  input.simulate('change');
  expect(changeHandler.mock.calls.length).toEqual(1);

  input.simulate('keyup');
  expect(keyUpHandler.mock.calls.length).toEqual(1);

  button.simulate('click');
  expect(sendHandler.mock.calls.length).toEqual(1);
});