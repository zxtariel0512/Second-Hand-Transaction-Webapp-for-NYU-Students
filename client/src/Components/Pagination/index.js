import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      width: "20%",
      margin: "auto",
    },
  },
}));

export default function BasicPagination({ totalPages, setPageNum }) {
  const classes = useStyles();
  const hanldePageChange = (event, page) => {
    setPageNum(page);
  };
  return (
    <div className={classes.root}>
      <Pagination
        count={totalPages}
        color="primary"
        onChange={hanldePageChange}
      />
    </div>
  );
}
