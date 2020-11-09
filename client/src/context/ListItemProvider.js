// Controller to request and manage list items data/state
import React, {useState, useEffect} from 'react';
import request from '../utils/request';
import { createContext } from 'react'; 

export const ListItemContext = createContext();

export const ListItemProvider = (props) => {
    const [listings, setListings] = useState();
    const [filteredListings, setFilteredListings] = useState();
    //  Fetch listing items async
    useEffect( () => {
        async function fetchListing() {
            const res = await request({
                url: '/listings',
                method: 'Get',
            });
            setListings(res);
            setFilteredListings(res);
        }
        fetchListing();
    }, []);
    return (
        <ListItemContext.Provider value={[filteredListings, setFilteredListings, listings]}>
            {props.children}
        </ListItemContext.Provider>
    );
};
