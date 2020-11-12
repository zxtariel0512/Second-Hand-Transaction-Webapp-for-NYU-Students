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
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values);

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
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input
            name="email"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          {errors.email && errors.email.message}

          <input
            name="username"
            ref={register({
              validate: (value) => value !== "admin" || "Nice try!",
            })}
          />
          {errors.username && errors.username.message}
          <button type="submit">Submit</button> */}
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
