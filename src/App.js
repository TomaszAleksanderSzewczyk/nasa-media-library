import React from 'react';
import { createHashRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import ShowPage from './components/ShowPage/ShowPage';
import GlobalStyles from './styles/GlobalStyles';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<SearchPage />} />
      <Route path="show/:nasaId" element={<ShowPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;