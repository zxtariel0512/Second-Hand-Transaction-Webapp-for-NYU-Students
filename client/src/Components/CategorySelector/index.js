/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import Box from "@material-ui/core/Box";
import getCategory from "../../Controller/category/getCategoryList";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core/";
import MessageContext from "../../Context/MessageContext";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: "50%",
  },
}));

export default function CategorySelector(props) {
  const [loading, setLoading] = useState(false);

  const [firstLevelCat, setFirstLevelCat] = useState([]);
  const [secondLevelCat, setSecondLevelCat] = useState([]);
  const [currentFirstLevel, setCurrentFirstLevel] = useState([]);
  const [currentSecondLevel, setCurrentSecondLevel] = useState([]);
  const [openSecondLevel, setOpenSecondLevel] = useState(false);

  const classes = useStyles();

  const { setError } = useContext(MessageContext);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await getCategory("1");
      res.success ? setFirstCategories(res.data) : setError(res.message);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const previousFirstCat = window.localStorage.getItem("firstCat");
    const previousSecondCat = window.localStorage.getItem("secondCat");
    if (previousFirstCat) setCurrentFirstLevel(previousFirstCat);
    if (previousSecondCat) {
      setOpenSecondLevel(true);
      setCurrentSecondLevel(previousSecondCat);
      if (firstLevelCat.length > 0) {
        setSecondCategories(previousFirstCat);
      }
    }
  }, [firstLevelCat]);

  /**
   * Set First Level categories
   * @param {Array} data Category Array
   */
  const setFirstCategories = (data) => {
    setFirstLevelCat(
      data.map((e) => {
        return { name: e.name, child: e.child };
      })
    );
  };

  /**
   * Set Second Level categories
   * @param {Array} firstLevel first category name
   */
  const setSecondCategories = (firstLevel) => {
    const firstCategory = firstLevelCat.filter(
      (ele) => ele.name === firstLevel
    );
    setSecondLevelCat(firstCategory[0].child.map((e) => e.name));
  };

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="first-category-selector">Categories</InputLabel>
        <Select
          labelId="first-category-selector"
          labelWidth={80}
          id="demo-controlled-open-select"
          value={currentFirstLevel}
          onChange={(e) => {
            setCurrentFirstLevel(e.target.value);
            setSecondCategories(e.target.value);
            window.localStorage.setItem("firstCat", e.target.value);
            setOpenSecondLevel(true);
          }}
          placeholder={"Choose Categories"}
          fullWidth
        >
          {firstLevelCat.map((e) => (
            <MenuItem value={e.name}>{e.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {openSecondLevel && (
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            labelId="second-category-selector"
            id="demo-controlled-open-select"
            value={currentSecondLevel}
            placeholder={"Choose Categories"}
            onChange={(e) => {
              setCurrentSecondLevel(e.target.value);
              window.localStorage.setItem("secondCat", e.target.value);
            }}
            fullWidth
          >
            {secondLevelCat.map((e) => (
              <MenuItem value={e}>{e}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  );
}
