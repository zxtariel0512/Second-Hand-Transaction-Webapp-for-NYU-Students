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
    const [filteredListings, setFilteredListings, listings] = useContext(ListItemContext);
    
    const onSearchClick = (value, event) => {
        event.preventDefault();
        // console.log("value",value);
        if (value === "") {
            setFilteredListings(listings);
            return;
        }
        const lowercase = value.toLowerCase();
        const filtered = filteredListings.filter((itemObj) => itemObj.title.toLowerCase().includes(lowercase) || itemObj.category_id.toLowerCase().includes(lowercase));
        // console.log("listings", listings);
        setFilteredListings(filtered);
    }
    return (
        <div className={classes.customSearch}>
        <SearchField 
            classNames={classes.customSearchBar}
            placeholder='Type to search items...'
            onChange={onSearchClick}
        />
        </div>
        
    );
};

export default SearchBar;