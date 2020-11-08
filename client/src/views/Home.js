// view that lists items with a search bar above
import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import CustomGridList from '../components/CustomGridList/CustomGridList';
import { makeStyles } from '@material-ui/core/styles';
import CustomAppBar from '../components/CustomAppBar/CustomAppBar';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles({
    container: {
        width: '80%',
        margin: 'auto'
    },
    header: {
        marginTop: '50px',
        margin: 'auto',
        textAlign: 'center'
    },
    categories: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    category: {
        padding: '20px'
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
                    <p className={styles.category}>Books</p>
                    <p className={styles.category}>Electronics</p>
                    <p className={styles.category}>Clothes</p>
                    <p className={styles.category}>Automobiles</p>
                    <p className={styles.category}>More</p>
                </div>
                <CustomGridList />
            </div>
        </>
    );
};

export default Home;