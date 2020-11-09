// view that lists items with a search bar above
import React, { useState, useEffect, useContext } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import CustomGridList from '../components/CustomGridList/CustomGridList';
import { makeStyles } from '@material-ui/core/styles';
import CustomAppBar from '../components/CustomAppBar/CustomAppBar';
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    container: {
        width: '80%',
        margin: '150px auto'
    },
    header: {
        marginTop: '50px',
        margin: 'auto',
        textAlign: 'center'
    },
    categories: {
        height: '100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    category: {
        marginRight: '20px',
        height: '40px'
    },
    circle: {
        position: 'fixed',
        bottom: 50,
        right: 50,
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: '1px solid blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addicon: {
        color: 'blue'
    }

    
});

const Home = () => {
    const styles = useStyles();
    return (
        <>
            
                <CustomAppBar />
                <div className={styles.container}>
                    
                    <div className={styles.header}>
                        <Typography variant="h4">NYU Second Hand</Typography>
                    </div>
                    <SearchBar />
                    <div className={styles.categories}>
                    <Button className={styles.category} variant="contained" color="primary">Books</Button>
                    <Button className={styles.category} variant="contained" color="primary">Electronics</Button>
                    <Button className={styles.category} variant="contained" color="primary">Clothes</Button>
                    <Button className={styles.category} variant="contained" color="primary">Automobiles</Button>
                    <Button className={styles.category} variant="contained" color="primary">More</Button>
                    </div>
                    <CustomGridList />
                    <div className={styles.circle}>
                        
                            <AddIcon className={styles.addicon}></AddIcon>
                        
                    </div>
                </div>
            
        </>
    );
};

export default Home;