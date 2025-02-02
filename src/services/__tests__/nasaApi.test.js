import { searchNasaImages, getImageDetails } from '../nasaApi';
import axios from 'axios';

jest.mock('axios');

describe('NASA API Service', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  describe('searchNasaImages', () => {
    test('validates search query', async () => {
      await expect(searchNasaImages('')).rejects.toThrow('Search query is required');
    });

    test('performs search with valid parameters', async () => {
      const mockResponse = {
        data: {
          collection: {
            items: [{ id: 1 }]
          }
        }
      };

      axios.get.mockResolvedValueOnce(mockResponse);

      const result = await searchNasaImages('moon', '2000', '2023');
      expect(result).toEqual(mockResponse.data.collection.items);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/search'),
        expect.any(Object)
      );
    });
  });

  describe('getImageDetails', () => {
    test('validates NASA ID', async () => {
      await expect(getImageDetails('')).rejects.toThrow('NASA image ID is required');
    });

    test('fetches image details successfully', async () => {
      const mockSearchResponse = {
        data: {
          collection: {
            items: [{
              data: [{
                title: 'Test Image',
                nasa_id: 'test-id'
              }],
              links: [{ href: 'thumbnail.jpg' }]
            }]
          }
        }
      };

      const mockAssetResponse = {
        data: {
          collection: {
            items: [{ href: 'original.jpg' }]
          }
        }
      };

      axios.get
        .mockResolvedValueOnce(mockSearchResponse)
        .mockResolvedValueOnce(mockAssetResponse);

      const result = await getImageDetails('test-id');
      expect(result).toHaveProperty('title', 'Test Image');
      expect(result).toHaveProperty('originalImageUrl', 'original.jpg');
    });
  });
});