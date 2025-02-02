import axios from 'axios';

const NASA_API_URL = 'https://images-api.nasa.gov';

const validateSearchParams = (query, yearStart, yearEnd) => {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new Error('Search query is required and must be a text');
  }

  if (yearStart) {
    const yearStartNum = parseInt(yearStart);
    if (isNaN(yearStartNum) || yearStartNum < 1920 || yearStartNum > new Date().getFullYear()) {
      throw new Error('Start year must be a number between 1920 and current year');
    }
  }

  if (yearEnd) {
    const yearEndNum = parseInt(yearEnd);
    if (isNaN(yearEndNum) || yearEndNum < 1920 || yearEndNum > new Date().getFullYear()) {
      throw new Error('End year must be a number between 1920 and current year');
    }
  }

  if (yearStart && yearEnd && parseInt(yearStart) > parseInt(yearEnd)) {
    throw new Error('Start year cannot be later than end year');
  }
}

const validateNasaId = (nasaId) => {
  if (!nasaId || typeof nasaId !== 'string' || nasaId.trim().length === 0) {
    throw new Error('NASA image ID is required');
  }
}

export const searchNasaImages = async (query, yearStart, yearEnd) => {
  try {
    validateSearchParams(query, yearStart, yearEnd);

    const params = {
      q: query.trim(),
      media_type: 'image',
      ...(yearStart && { year_start: yearStart }),
      ...(yearEnd && { year_end: yearEnd })
    };

    const response = await axios.get(`${NASA_API_URL}/search`, { params });
    return response.data.collection.items;
  } catch (error) {
    if (error.response) {
      throw new Error(`NASA API Error: ${error.response.data.reason || 'Unknown error'}`);
    }
    throw error;
  }
};

export const getImageDetails = async (nasaId) => {
  try {
    validateNasaId(nasaId);

    const response = await axios.get(`${NASA_API_URL}/search?nasa_id=${nasaId}`);
    if (!response.data.collection.items.length) {
      throw new Error('Image with provided ID not found');
    }

    const item = response.data.collection.items[0];
    const metadata = item.data[0];
    const imageUrl = item.links?.[0]?.href;

    const assetResponse = await axios.get(`${NASA_API_URL}/asset/${nasaId}`);
    if (!assetResponse.data.collection.items.length) {
      throw new Error('No assets found for this image');
    }

    const originalImageUrl = assetResponse.data.collection.items[0].href;

    return {
      title: metadata.title || 'No title',
      description: metadata.description || 'No description',
      dateCreated: metadata.date_created || null,
      photographer: metadata.photographer || 'Unknown',
      keywords: metadata.keywords || [],
      center: metadata.center || 'Unknown',
      thumbnailUrl: imageUrl,
      originalImageUrl: originalImageUrl
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`NASA API Error: ${error.response.data.reason || 'Unknown error'}`);
    }
    throw error;
  }
};