
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import ChatBox from '../ChatBox';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../../reducers';
import { soloInitialState } from '../../../__factory__/storeInitialStates';



const store  = createStore(reducers, soloInitialState, applyMiddleware(thunk));



test('Selected contact name is displayed on chat history', () => {
    render( 
      <Provider store={store}>
          <ChatBox />
      </Provider>
    );
  

    // expecting the name of the selected contact to be displayed
    expect(screen.getByText(`Message history with ${soloInitialState.selectedContact.name}`)).toBeDefined();

    
  });

test('Send button enabled on text written', () => {
  render( 
    <Provider store={store}>
        <ChatBox />
    </Provider>
  );

  // expecting Send button to be disabled at first
  expect(screen.getByTestId(/chat-button/i)).toBeDisabled();

  // writting Hi on the chat
  fireEvent.change(screen.getByPlaceholderText(/Aa/i),  { target: { value: 'Hi' } })

  // expecting Send button to be enabled after writting
  expect(screen.getByTestId(/chat-button/i)).toBeEnabled();
});

test('Chat textarea text cleared on Send Button click', () => {
    render( 
      <Provider store={store}>
          <ChatBox />
      </Provider>
    );
  
    // writting Hi on the chat
    fireEvent.change(screen.getByPlaceholderText(/Aa/i),  { target: { value: 'Hi there' } });

     // hitting Send button
    fireEvent.click(screen.getByTestId(/chat-button/i));

    // expecting Send button to be enabled after writting
    expect(screen.getByPlaceholderText(/Aa/i)).toHaveDisplayValue('');

    
  });
