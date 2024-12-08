import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );

  useEffect(() => {
    onSearch(searchText);
  }, [searchText, onSearch]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    localStorage.setItem('searchText', value); 
  };

  return (
    <input
      type="text"
      placeholder="Rechercher un Pokémon"
      value={searchText}
      onChange={handleSearchChange}
      className="border rounded px-4 py-2 focus:outline-none w-full"
    />
  );
};

export default SearchBar;
