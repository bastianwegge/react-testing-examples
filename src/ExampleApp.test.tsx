import React from 'react';
import { render, screen } from '@testing-library/react';

import ExampleApp from './ExampleApp';

describe('ExampleApp', () => {
  test('renders ExampleApp component', () => {
    render(<ExampleApp />);

    // screen.debug();
    expect(screen.getByText('Search:')).toBeInTheDocument();
    // screen.getByRole('');
  });
});
