import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
  render(<App />);
  const title = screen.getByText(/Office & Employee Manager/i);
  expect(title).toBeInTheDocument();
});
