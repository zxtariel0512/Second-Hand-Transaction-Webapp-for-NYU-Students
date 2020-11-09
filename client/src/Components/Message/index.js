import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorMessage(props) {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      {props.message && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          {props.type === "error" ? (
            <>
              <Alert onClose={handleClose} severity="error">
                {props.message}
              </Alert>
            </>
          ) : (
            <>
              <Alert onClose={handleClose} severity="success">
                {props.message}
              </Alert>
            </>
          )}
        </Snackbar>
      )}
    </>
  );
}
