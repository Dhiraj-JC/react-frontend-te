import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
});

test('renders page with all the controls rendered', () => {
  render(<App />);

  expect(screen.getByTestId('searchInput')).toBeInTheDocument();
  const loadDataButton = screen.getByRole('button', { name: 'Load data' });
  expect(loadDataButton).toBeInTheDocument();
  expect(loadDataButton).not.toBeDisabled();
});

test('Click load Data button and disable the button', async () => {
  render(<App />);

  const loadDataButton = screen.getByRole('button', { name: 'Load data' });
  fireEvent.click(loadDataButton);
  await waitForElementToBeRemoved(() => screen.queryByText('Loading .....'));
  expect(loadDataButton).toBeDisabled();
});

test('Click load Data button and disable the button and check the result count', async () => {
  render(<App />);

  const loadDataButton = screen.getByRole('button', { name: 'Load data' });
  fireEvent.click(loadDataButton);
  await waitForElementToBeRemoved(() => screen.queryByText('Loading .....'));
  expect(loadDataButton).toBeDisabled();

  const users = await screen.findAllByText('Users Details');
  expect(users).toHaveLength(10);
});

test('Click load Data button and search specific user', async () => {
  render(<App />);

  const loadDataButton = screen.getByRole('button', { name: 'Load data' });
  fireEvent.click(loadDataButton);
  await waitForElementToBeRemoved(() => screen.queryByText('Loading .....'));
  expect(loadDataButton).toBeDisabled();

  const searchInputElement = screen.getByTestId('searchInput');
  expect(searchInputElement).toBeInTheDocument();

  fireEvent.change(searchInputElement, { target: { value: 'le' } });

  const searchButton = screen.getByRole('button', { name: 'Search User' });
  fireEvent.click(searchButton);

  expect(await screen.getByText(/10 results found/i)).toBeInTheDocument();
});
