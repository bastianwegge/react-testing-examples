import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './FetchDataApp';

jest.mock('axios');

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];

    (axios.get as jest.Mock).mockImplementationOnce(() => Promise.resolve({ data: { hits: stories } }));

    await act(async () => {
      render(<App />);

      await userEvent.click(screen.getByRole('button'));
    });

    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(2);
  });

  test('fetches stories from an API and fails', async () => {
    (axios.get as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error()));

    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByRole('button'));
    });

    const message = await screen.findByText(/Something went wrong/);

    expect(message).toBeInTheDocument();
  });
});
