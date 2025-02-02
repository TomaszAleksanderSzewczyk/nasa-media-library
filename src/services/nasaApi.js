import axios from 'axios';

const NASA_API_URL = 'https://images-api.nasa.gov';

export const searchNasaImages = async (query, yearStart, yearEnd) => {
  try {
    const params = {
      q: query,
      media_type: 'image',
      ...(yearStart && { year_start: yearStart }),
      ...(yearEnd && { year_end: yearEnd })
    };

    const response = await axios.get(`${NASA_API_URL}/search`, { params });
    return response.data.collection.items;
  } catch (error) {
    throw new Error('Błąd podczas wyszukiwania obrazów NASA');
  }
};

export const getImageDetails = async (nasaId) => {
  try {
    const response = await axios.get(`${NASA_API_URL}/asset/${nasaId}`);
    return response.data.collection.items;
  } catch (error) {
    throw new Error('Błąd podczas pobierania szczegółów obrazu');
  }
};