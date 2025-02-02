import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import { useNasaSearch } from '../../hooks/useNasaSearch/useNasaSearch';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 1rem;
`;

const SearchPage = () => {
  const { results, loading, error, search } = useNasaSearch();

  useEffect(() => {

    const savedQuery = localStorage.getItem('nasaSearchQuery');
    const savedYearStart = localStorage.getItem('nasaSearchYearStart');
    const savedYearEnd = localStorage.getItem('nasaSearchYearEnd');
    
  }, [search]);

  const handleSearch = (query, yearStart, yearEnd) => {
    localStorage.setItem('nasaSearchQuery', query);
    localStorage.setItem('nasaSearchYearStart', yearStart || '');
    localStorage.setItem('nasaSearchYearEnd', yearEnd || '');
    
    search(query, yearStart, yearEnd);
  };

  return (
    <Container>
      <Header>
        <h1>Nasa Media Library</h1>
      </Header>
      
      <SearchForm 
        initialQuery={localStorage.getItem('nasaSearchQuery') || ''}
        initialYearStart={localStorage.getItem('nasaSearchYearStart') || ''}
        initialYearEnd={localStorage.getItem('nasaSearchYearEnd') || ''}
        onSearch={handleSearch} 
      />
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {loading && <LoadingMessage>Wyszukiwanie...</LoadingMessage>}
      {results.length > 0 && <SearchResults results={results} />}
    </Container>
  );
};

export default SearchPage;