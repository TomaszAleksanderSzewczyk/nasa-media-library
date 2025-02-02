import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ShowPage from '../ShowPage';
import { getImageDetails } from '../../services/nasaApi';

jest.mock('../../services/nasaApi');

const mockImageData = {
  title: 'Test Image',
  location: 'Test Location',
  photographer: 'Test Photographer',
  date_created: '2023-01-01',
  description: 'Test Description',
  keywords: ['test', 'image'],
  links: [{ href: 'https://example.com/image.jpg' }]
};

describe('ShowPage', () => {
  beforeEach(() => {
    getImageDetails.mockClear();
  });

  test('renders image details correctly', async () => {
    getImageDetails.mockResolvedValueOnce(mockImageData);

    render(
      <MemoryRouter initialEntries={['/show/test-id']}>
        <Routes>
          <Route path="/show/:nasaId" element={<ShowPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockImageData.title)).toBeInTheDocument();
      expect(screen.getByText(mockImageData.location)).toBeInTheDocument();
      expect(screen.getByText(mockImageData.photographer)).toBeInTheDocument();
      expect(screen.getByText(mockImageData.description)).toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('image')).toBeInTheDocument();
    });
  });

  test('handles error state', async () => {
    getImageDetails.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <MemoryRouter initialEntries={['/show/test-id']}>
        <Routes>
          <Route path="/show/:nasaId" element={<ShowPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/błąd/i)).toBeInTheDocument();
    });
  });
});