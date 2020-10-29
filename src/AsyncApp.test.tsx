import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AsyncApp, { Search } from './AsyncApp';

describe('AsyncApp', () => {
  test('renders AsyncApp component', async () => {
    render(<AsyncApp />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();

    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });

  test('renders App component', async () => {
    render(<AsyncApp />);

    // wait for the user to resolve
    // needs only be used in our special case
    await screen.findByText(/Signed in as/);

    // screen.debug();

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    // fireEvent only triggers the event whereas userEvent triggers actual key events
    /*
      Whenever possible, use userEvent over fireEvent when using React Testing Library.
      At the time of writing this, userEvent doesn't include all the features of fireEvent,
      however, this may change in the future.
    * */
    // fireEvent.change(screen.getByRole('textbox'), {
    //   target: { value: 'search value' },
    // });

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();

    // screen.debug();
  });
});

describe('Search', () => {
  test('calls the onChange callback handler', () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
