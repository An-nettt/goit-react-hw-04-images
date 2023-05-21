import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import Searchbar from './Searchbar';
import Loader from './Loader';
import { getPictures } from '../services/getPictures';
import ImageGallery from './ImageGallery';
import Button from './Button';

import { AppStyled } from './AppStyled';

export default function App() {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log(page);
    console.log(query);

    getPictures(query, page)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Sorry, but nothing was found for your request ${query}`)
        );
      })
      .then(newPictures => {
        if (newPictures.total === 0) {
          Notiflix.Notify.info('Sorry, but nothing was found for your query');
        }
        setPictures(prevState => [...prevState.pictures, ...newPictures.hits]);
        setShowButton(page < Math.ceil(newPictures.totalHits / 12));
      })
      .catch(error => {
        setError(error);
        setShowButton(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    //   // return () => {
    //   //   second;
    //   // };
  }, [page, query]);

  const handleSearchFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setPictures([]);
    setError(null);
  };

  const handleCllickNextButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleSearchFormSubmit} />
      {isLoading && <Loader />}
      {error && <p>{error.message}</p>}
      <ImageGallery pictures={pictures} />
      {showButton && <Button onClick={handleCllickNextButton} />}
    </AppStyled>
  );
}
