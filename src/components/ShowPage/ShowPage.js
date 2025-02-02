import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getImageDetails } from '../../services/nasaApi';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    background: #1557b0;
  }
`;

const ImageContainer = styled.div`
  margin: 2rem 0;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const MetadataSection = styled.section`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
`;

const KeywordsList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  li {
    background: #e9ecef;
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.9rem;
  }
`;

const Title = styled.h1`
  color: #1a73e8;
  margin: 1rem 0;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 1rem;
  background: #f8d7da;
  border-radius: 4px;
  margin: 2rem 0;
`;

const ShowPage = () => {
  const { nasaId } = useParams();
  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const data = await getImageDetails(nasaId);
        setImageData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [nasaId]);

  if (loading) return <LoadingSpinner>Loading image details...</LoadingSpinner>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!imageData) return <ErrorMessage>No image data found</ErrorMessage>;

  const formatDate = (dateString) => {
    if (!dateString) return 'No date available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        &larr; Back to Search Results
      </BackButton>

      <Title>{imageData.title}</Title>
      
      <ImageContainer>
        <img 
          src={imageData.originalImageUrl} 
          alt={imageData.title}
          loading="lazy"
        />
      </ImageContainer>

      <MetadataSection>
        <h2>Image Details</h2>
        <p><strong>Location:</strong> {imageData.center || 'Location not specified'}</p>
        <p><strong>Photographer:</strong> {imageData.photographer || 'Photographer not specified'}</p>
        <p><strong>Date:</strong> {formatDate(imageData.dateCreated)}</p>
        
        {imageData.description && (
          <>
            <h3>Description</h3>
            <p>{imageData.description}</p>
          </>
        )}
        
        {imageData.keywords && imageData.keywords.length > 0 && (
          <>
            <h3>Keywords</h3>
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