
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import ChatContactList from '../ChatContactList';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../../reducers';
import { soloInitialState } from '../../../__factory__/storeInitialStates';



const store  = createStore(reducers, soloInitialState, applyMiddleware(thunk));



test('All contacts are displayed on chat contact list', () => {
    render( 
      <Provider store={store}>
          <ChatContactList />
      </Provider>
    );
  

    // expecting the name of all contacts to be displayed
    soloInitialState.contacts.forEach(
      contact =>  expect(screen.getByText(contact.name)).toBeDefined());

    
  });

test('Search input filters contacts', () => {
  render( 
    <Provider store={store}>
        <ChatContactList />
    </Provider>
  );

   // expecting the name of all contacts to be displayed
   soloInitialState.contacts.forEach(
    contact =>  expect(screen.getByText(contact.name)).toBeDefined());


  // writting an unmatching text on the search input
  fireEvent.change(screen.getByTestId(/search-input/i),  { target: { value: 'k' } })

  // expecting the name of all contacts to be displayed
  soloInitialState.contacts.forEach(
  contact =>  {
    const element = screen.queryByText(contact.name);
    expect(element).not.toBeInTheDocument();
  });

});
