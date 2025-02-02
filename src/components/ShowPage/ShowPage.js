import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getImageDetails } from '../../services/nasaApi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background-color: #0052a3;
  }
`;

const ImageContainer = styled.div`
  margin: 2rem 0;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const MetadataSection = styled.section`
  margin: 2rem 0;
`;

const KeywordsList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  li {
    background-color: #f0f0f0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
`;

const ShowPage = () => {
  const { nasaId } = useParams();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(imageData);
  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const data = await getImageDetails(nasaId);
        // Zakładamy, że pierwsze item zawiera metadane
        const metadata = data.collection?.items[0]?.data[0];
        const imageUrl = data.collection?.items[0]?.links?.[0]?.href;
        
        setImageData({
          ...metadata,
          imageUrl
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [nasaId]);

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;
  if (!imageData) return <div>Nie znaleziono danych</div>;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        &larr; Powrót
      </BackButton>

      <h1>{imageData.title}</h1>
      
      <ImageContainer>
        <img src={imageData.imageUrl} alt={imageData.title} />
      </ImageContainer>

      <MetadataSection>
        <h2>Szczegóły</h2>
        <p><strong>Lokalizacja:</strong> {imageData.location || 'Brak danych'}</p>
        <p><strong>Fotograf:</strong> {imageData.photographer || 'Brak danych'}</p>
        <p><strong>Data:</strong> {new Date(imageData.date_created).toLocaleDateString()}</p>
        <p><strong>Opis:</strong> {imageData.description}</p>
        
        {imageData.keywords && (
          <>
            <h3>Słowa kluczowe:</h3>
            <KeywordsList>
              {imageData.keywords.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </KeywordsList>
          </>
        )}
      </MetadataSection>
    </Container>
  );
};

export default ShowPage;