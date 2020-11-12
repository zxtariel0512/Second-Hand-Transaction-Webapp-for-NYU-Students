// view that lists items with a search bar above
import React, {useState, useEffect, useContext} from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import CustomGridList from "../../Components/CustomGridList/CustomGridList";
import {makeStyles} from "@material-ui/core/styles";
import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import {Typography, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import style from "./style";
import HomePageContext from "./store/context";
import MessageContext from "../../Context/MessageContext";
import getListing from "../../Controller/Listing/getListing";

const useStyles = makeStyles(style);

const Homepage = () => {
    const {setError} = useContext(MessageContext);
    const classes = useStyles();
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);

    /**
     * Get the homepage listing when the page is loaded
     */

    useEffect(() => {
        const getHomepageListing = async () => {
            const res = await getListing();
            // show error if request is failed
            res.success ? setListings(res.data) : setError(res.message);
            console.log(res);
        };
        getHomepageListing();
    }, []);

    // set the shared stated (Context) here
    const context = {
        listings,
        setListings,
        filteredListings,
        setFilteredListings,
    };

    return (
        <>
            <HomePageContext.Provider value={context}>
                <CustomAppBar/>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <Typography variant="h4">NYU Second Hand</Typography>
                    </div>
                    <SearchBar/>
                    <div className={classes.categories}>
                        <Button
                            className={classes.category}
                            variant="contained"
                            color="primary"
                        >
                            Books
                        </Button>
                        <Button
                            className={classes.category}
                            variant="contained"
                            color="primary"
                        >

                            Electronics
                        </Button>
                        <Button
                            className={classes.category}
                            variant="contained"
                            color="primary"
                        >
                            Clothes
                        </Button>
                        <Button
                            className={classes.category}
                            variant="contained"
                            color="primary"
                        >
                            Automobiles
                        </Button>
                        <Button
                            className={classes.category}
                            variant="contained"
                            color="primary"
                        >
                            More
                        </Button>
                    </div>
                    <CustomGridList/>
                    <div className={classes.circle}>
                        <AddIcon className={classes.addicon}></AddIcon>
                    </div>
                </div>
            </HomePageContext.Provider>
        </>
    );
};

export default Homepage;
