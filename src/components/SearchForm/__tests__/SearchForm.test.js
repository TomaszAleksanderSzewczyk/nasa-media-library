import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search form with all inputs', () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText(/wyszukaj obrazy nasa/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/rok początkowy/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/rok końcowy/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /szukaj/i })).toBeInTheDocument();
  });

  test('calls onSearch with correct parameters when form is submitted', () => {
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const queryInput = screen.getByPlaceholderText(/wyszukaj obrazy nasa/i);
    const yearStartInput = screen.getByPlaceholderText(/rok początkowy/i);
    const yearEndInput = screen.getByPlaceholderText(/rok końcowy/i);
    const submitButton = screen.getByRole('button', { name: /szukaj/i });

    fireEvent.change(queryInput, { target: { value: 'moon' } });
    fireEvent.change(yearStartInput, { target: { value: '2020' } });
    fireEvent.change(yearEndInput, { target: { value: '2023' } });
    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith('moon', '2020', '2023');
  });
});