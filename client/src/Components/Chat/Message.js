import React from "react";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  message: {
    marginBottom: "20px",
  },
  messageInfo: {
    marginLeft: "5px",
    marginBottom: "5px",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 5px",
    transform: "scale(0.8)",
  },
  messageContent: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "7px",
    padding: " 12px 15px",
  },
});

export default function Message(props) {
  const classes = useStyles();
  const { msg } = props;

  const bull = <span className={classes.bullet}>•</span>;

  const getTime = (time) => {
    const startOfToday = moment().startOf("day");
    const startOfYesterday = moment().subtract(1, "days").startOf("day");
    if (moment(time).isAfter(startOfToday)) {
      return moment(time).format("[Today at] h:mm a");
    } else if (moment(time).isAfter(startOfYesterday)) {
      return moment(time).format("[Yesterday at] h:mm a");
    } else {
      return moment(time).format("MM/DD/YYYY");
    }
  };

  const time = getTime(msg.time);

  return (
    <div className={classes.message}>
      <div className={classes.messageInfo}>
        {msg.author}
        {bull}
        {time}
      </div>
      <div className={classes.messageContent}>{msg.value}</div>
    </div>
  );
}
