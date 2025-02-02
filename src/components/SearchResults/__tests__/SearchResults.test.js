import { render, screen } from '@testing-library/react';
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
  test('renders search results correctly', () => {
    render(
      <BrowserRouter>
        <SearchResults results={mockResults} />
      </BrowserRouter>
    );

    expect(screen.getByText('Moon Landing')).toBeInTheDocument();
    expect(screen.getByText('Moon')).toBeInTheDocument();
    expect(screen.getByText('NASA')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders "Lokalizacja nieznana" when location is missing', () => {
    const resultsWithoutLocation = [{
      ...mockResults[0],
      data: [{
        ...mockResults[0].data[0],
        location: null
      }]
    }];

    render(
      <BrowserRouter>
        <SearchResults results={resultsWithoutLocation} />
      </BrowserRouter>
    );

    expect(screen.getByText('Lokalizacja nieznana')).toBeInTheDocument();
  });
});