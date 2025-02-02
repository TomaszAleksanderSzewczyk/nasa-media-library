import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0052a3;
  }
`;

const SearchForm = ({ onSearch, initialQuery, initialYearStart, initialYearEnd }) => {
  const [query, setQuery] = useState(initialQuery);
  const [yearStart, setYearStart] = useState(initialYearStart);
  const [yearEnd, setYearEnd] = useState(initialYearEnd);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, yearStart, yearEnd);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search NASA images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Year Start"
        value={yearStart}
        onChange={(e) => setYearStart(e.target.value)}
        max={new Date().getFullYear()}
      />
      <Input
        type="number"
        placeholder="Year End"
        value={yearEnd}
        onChange={(e) => setYearEnd(e.target.value)}
        max={new Date().getFullYear()}
      />
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default SearchForm;