import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const ResultCard = styled(Link)`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  pointer-events: none;
`;

const ResultInfo = styled.div`
  padding: 1rem;
`;

const SearchResults = ({ results }) => {
  return (
    <ResultsGrid>
      {results.map((item) => {
        const data = item.data[0];
        const thumbnail = item.links?.[0]?.href;
        const formattedDate = data.date_created 
          ? new Date(data.date_created).toLocaleDateString('pl-PL', {
              day: '2-digit',
              month: '2-digit', 
              year: 'numeric'
            }).replace(/\./g, '-')
          : 'Data nieznana';

        return (
          <ResultCard key={data.nasa_id} to={`/show/${data.nasa_id}`}>
            <Image 
              src={thumbnail} 
              alt={data.title}
              loading="lazy"
            />
            <ResultInfo>
              <h3>{data.title}</h3>
              <p>{data.location || 'Location unknown'}</p>
              <p>{data.photographer || 'Photographer unknown'}</p>
              <p>{formattedDate || 'Date unknown'}</p>
            </ResultInfo>
          </ResultCard>
        );
      })}
    </ResultsGrid>
  );
};

export default SearchResults;