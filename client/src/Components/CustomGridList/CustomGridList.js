import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import CustomCard from "../Template/CustomCard/CustomCard";
import { Typography } from "@material-ui/core";
import FunnelIcon from "../../Assets/img/icons/funnel.svg";
// import { ListItemContext } from '../../../Context/ListItemProvider';
import HomePageContext from "../../View/Home/store/context";
const useStyles = makeStyles((theme) => ({
  root: {},
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "350px 350px 350px ",
    gridTemplateRows: "400px 400px 400px 400px",
    gridGap: "25px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  gridtitle: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  filter: {
    paddingTop: "15px",
    width: "120px",
    display: "flex",
    justifyContent: "space-between",
  },
  wordpadding: {},
}));

export default function CustomGridList() {
  const classes = useStyles();
  const { filteredListings } = useContext(HomePageContext);
  // set timeout for each card to execute grow animation
  const timeout = filteredListings.map((x, index) => index * 300);

  return (
    <div className={classes.root}>
      <div className={classes.gridtitle}>
        <Typography variant="h4">Explore</Typography>
        <div className={classes.filter}>
          <span>Newest Posts</span>
          <img src={FunnelIcon} width={15} height={15} alt="filter icon" />
        </div>
      </div>
      <div className={classes.gridContainer}>
        {filteredListings &&
          filteredListings.map((item, index) => (
            <div>
              <CustomCard {...item} timeout={timeout[index]} />
            </div>
          ))}
      </div>
    </div>
  );
}
