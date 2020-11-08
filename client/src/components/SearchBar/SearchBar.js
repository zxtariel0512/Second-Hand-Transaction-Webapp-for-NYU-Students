import React from 'react';
import SearchField from 'react-search-field';


const SearchBar = () => {
    const onSearchClick = (value) => {
        return value;
    }
    return (
        <SearchField 
            placeholder='Type to search items...'
            onSearchClick={onSearchClick}
        />
    );
};

export default SearchBar;