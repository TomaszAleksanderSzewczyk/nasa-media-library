import { renderHook, act } from '@testing-library/react';
import { useNasaSearch } from '../useNasaSearch';
import { searchNasaImages } from '../../services/nasaApi';

// Mock the API service
jest.mock('../../services/nasaApi');

describe('useNasaSearch', () => {
  beforeEach(() => {
    searchNasaImages.mockClear();
  });

  test('initial state', () => {
    const { result } = renderHook(() => useNasaSearch());

    expect(result.current.results).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('successful search', async () => {
    const mockData = [{ id: 1, title: 'Test Image' }];
    searchNasaImages.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => useNasaSearch());

    await act(async () => {
      await result.current.search('moon', '2020', '2023');
    });

    expect(result.current.results).toEqual(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('failed search', async () => {
    const errorMessage = 'API Error';
    searchNasaImages.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useNasaSearch());

    await act(async () => {
      await result.current.search('moon', '2020', '2023');
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });
});