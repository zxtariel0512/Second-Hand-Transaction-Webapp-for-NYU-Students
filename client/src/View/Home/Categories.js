import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import getCategory from "../../Controller/category/getCategoryList";
import MessageContext from "../../Context/MessageContext";
import style from "./style";
import CategoryDropdown from "./CategoryDropdown";
import HomePageContext from "./store/context";

const useStyles = makeStyles((theme) => style(theme));

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setError } = useContext(MessageContext);
  const { listings, setFilteredListings } = useContext(HomePageContext);

  useEffect(() => {
    async function getCategories() {
      setLoading(true);
      const res = await getCategory("1");
      res.success
        ? setCategories(res.data)
        : setError("Unable to get categories");
      setLoading(false);
    }
    getCategories();
  }, []);

  const showAllListings = () => {
    setFilteredListings(listings);
  };

  const classes = useStyles();

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center">
          Loading Categories
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="center" my="20px">
            <Button
              className={classes.category}
              variant="outlined"
              onClick={showAllListings}
            >
              All
            </Button>
            {categories.slice(0, 5).map((ele, i) => (
              <CategoryDropdown name={ele.name} secondLevel={ele.child} />
            ))}
          </Box>
          <Box display="flex" justifyContent="center" my="20px">
            {categories.slice(5, categories.length).map((ele, i) => (
              <CategoryDropdown name={ele.name} secondLevel={ele.child} />
            ))}
          </Box>
        </>
      )}
    </>
  );
}
