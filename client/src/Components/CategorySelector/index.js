/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { top100Films } from "./data";

export default function CategorySelector(props) {
  const [currentValue, setCurrentValue] = useState("");
  const [previous, setPrevious] = useState(false);

  useEffect(() => {
    const previousItem = window.localStorage.getItem("itemCategory");
    if (previousItem) {
      setPrevious(true);
      setCurrentValue(previousItem);
    }
  }, []);

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.title}
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
            label="Choose Category"
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
