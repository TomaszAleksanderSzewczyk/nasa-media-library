import { render, screen } from '@testing-library/react';
import { act } from 'react'; // Zmiana importu act
import { BrowserRouter } from 'react-router-dom';
import SearchResults from '../SearchResults';

const mockResults = [
  {
    data: [{
      nasa_id: '1',
      title: 'Moon Landing',
      location: 'Moon',
      photographer: 'NASA',
    }],
    links: [{
      href: 'https://example.com/image.jpg'
    }]
  }
];

describe('SearchResults', () => {
  test('renders search results correctly', async () => {
    await act(() => {
      render(
        <BrowserRouter>
          <SearchResults results={mockResults} />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Moon Landing')).toBeInTheDocument();
    expect(screen.getByText('Moon')).toBeInTheDocument();
    expect(screen.getByText('NASA')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  // ... pozostałe testy z act ...
});