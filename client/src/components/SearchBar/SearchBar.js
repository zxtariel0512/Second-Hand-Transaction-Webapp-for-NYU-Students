import React, { useContext } from 'react';
import SearchField from 'react-search-field';
import { makeStyles } from '@material-ui/core/styles';
import { ListItemContext } from '../../context/ListItemProvider';
const useStyles = makeStyles({
    customSearch: {
        margin: '55px auto',
        textAlign: 'center'
    },
    customSearchBar: {
        width: '80%',
        height: '40px',
        lineHeight: '36px'
    }
})
const SearchBar = () => {
    const classes = useStyles();
    // grab listings value from context
    const [listings, setListings] = useContext(ListItemContext);
    console.log(listings);
    const onSearchClick = (value) => {
        const lowercase = value.toLowerCase();
        const filtered = listings.filter((itemObj) => itemObj.title.toLowerCase().includes(lowercase) || itemObj.category_id.toLowerCase().includes(lowercase));
        setListings(filtered);
    }
    return (
        <div className={classes.customSearch}>
        <SearchField 
            classNames={classes.customSearchBar}
            placeholder='Type to search items...'
            onSearchClick={onSearchClick}
        />
        </div>
        
    );
};

export default SearchBar;