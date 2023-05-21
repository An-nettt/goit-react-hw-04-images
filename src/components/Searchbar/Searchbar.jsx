import { useState } from 'react';
// import PropTypes from 'prop-types';

import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';

import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './SearchbarStyled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <IconContext.Provider
            value={{
              color: 'black',
              size: 17,
              style: { verticalAlign: 'middle' },
            }}
          >
            <BsSearch />
          </IconContext.Provider>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          value={query}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </SearchForm>
    </SearchbarStyle>
  );
}

// Searchbar.propTypes = {
//   query: PropTypes.string.isRequired,
// };
