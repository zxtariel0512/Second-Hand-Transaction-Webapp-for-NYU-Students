import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import { get, useForm } from "react-hook-form";
import CategorySelector from "../../../Components/CategorySelector";
import { getLocalStorage, setLocalStorage } from "../../../Utils/localstorage";

const useStyles = makeStyles((theme) => ({
  formInput: {
    marginTop: "30px",
  },
}));

export default function BasicInfo() {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Load the local storage data
   */
  const onLoad = () => {
    setCategory(getLocalStorage("itemCategory"));
    setTitle(getLocalStorage("itemTitle"));
    setDescription(getLocalStorage("itemDescription"));
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingY="50px"
        width="400px"
      >
        <form>
          <CategorySelector
            className={classes.formInput}
            onChange={(e) => {
              setCategory(e.target.value);
              setLocalStorage("itemCategory", e.target.value);
            }}
            value={category}
          />
          <TextField
            className={classes.formInput}
            id="title-input"
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setLocalStorage("itemTitle", e.target.value);
            }}
          />
          <TextField
            className={classes.formInput}
            id="description-input"
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={6}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setLocalStorage("itemDescription", e.target.value);
            }}
          />
        </form>
      </Box>
    </>
  );
}
