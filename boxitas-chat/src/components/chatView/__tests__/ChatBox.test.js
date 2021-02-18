
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import ChatBox from '../ChatBox'

test('Send button enabled on text written', () => {
  render( <ChatBox />);

  // expecting Send button to be disabled at first
  expect(screen.queryByText(/Send/i)).toBeDisabled();

  // writting Hi on the chat
  fireEvent.change(screen.getByTestId(/chat-textarea/i),  { target: { value: 'Hi' } })

  // expecting Send button to be enabled after writting
  expect(screen.queryByText(/Send/i)).toBeEnabled();
})