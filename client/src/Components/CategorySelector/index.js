/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import getCategory from "../../Controller/category/getCategoryList";
import MessageContext from "../../Context/MessageContext";

export default function CategorySelector(props) {
  const [currentValue, setCurrentValue] = useState("");
  const [previous, setPrevious] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setError } = useContext(MessageContext);

  useEffect(() => {
    const previousItem = window.localStorage.getItem("itemCategory");
    if (previousItem) {
      setPrevious(true);
      setCurrentValue(previousItem);
    }

    /**
     * Set Second Level categories
     * @param {Array} data Category Array
     */
    function setCategories(data) {
      setOptions(data.map((e) => e.name));
    }

    async function fetchCategories() {
      setLoading(true);
      const res = await getCategory("2");
      res.success ? setCategories(res.data) : setError(res.message);
      setLoading(false);
    }

    fetchCategories();
  }, []);

  return (
    <>
      <Autocomplete
        id="category-autocomplete"
        options={options}
        disabled={loading}
        onSelect={(e) => {
          setCurrentValue(e.target.value);
          props.onChange(e);
          setPrevious(false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={props.inputRef}
            value={currentValue}
            label={loading ? "Loading Categories" : "Choose Categories"}
            variant="outlined"
          />
        )}
      />
      {previous && (
        <Box mt="10px">
          <small style={{ color: "#90a4ae" }}>
            <strong>Previous Selection: </strong>
            {currentValue}
          </small>
        </Box>
      )}
    </>
  );
}
