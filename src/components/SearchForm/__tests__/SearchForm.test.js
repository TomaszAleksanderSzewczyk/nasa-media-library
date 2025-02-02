import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import SearchForm from '../SearchForm';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search form with all inputs', async () => {
    await act(async () => {
      render(<SearchForm onSearch={mockOnSearch} />);
    });
    
    expect(screen.getByPlaceholderText(/search nasa images/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/start year/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/end year/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('calls onSearch with correct parameters when form is submitted', async () => {
    await act(async () => {
      render(<SearchForm onSearch={mockOnSearch} />);
    });
    
    const queryInput = screen.getByPlaceholderText(/search nasa images/i);
    const yearStartInput = screen.getByPlaceholderText(/start year/i);
    const yearEndInput = screen.getByPlaceholderText(/end year/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.change(queryInput, { target: { value: 'moon' } });
    });

    await act(async () => {
      fireEvent.change(yearStartInput, { target: { value: '2020' } });
    });

    await act(async () => {
      fireEvent.change(yearEndInput, { target: { value: '2023' } });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSearch).toHaveBeenCalledWith('moon', '2020', '2023');
  });

  test('validates year range before submission', async () => {
    await act(async () => {
      render(<SearchForm onSearch={mockOnSearch} />);
    });
    
    const queryInput = screen.getByPlaceholderText(/search nasa images/i);
    const yearStartInput = screen.getByPlaceholderText(/start year/i);
    const yearEndInput = screen.getByPlaceholderText(/end year/i);
    const submitButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.change(queryInput, { target: { value: 'moon' } });
      fireEvent.change(yearStartInput, { target: { value: '2023' } });
      fireEvent.change(yearEndInput, { target: { value: '2020' } });
      fireEvent.click(submitButton);
    });

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(screen.getByText(/start year cannot be later than end year/i)).toBeInTheDocument();
  });

  test('handles empty query submission', async () => {
    await act(async () => {
      render(<SearchForm onSearch={mockOnSearch} />);
    });
    
    const submitButton = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSearch).not.toHaveBeenCalled();
    expect(screen.getByText(/please enter a search query/i)).toBeInTheDocument();
  });
});