import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CustomCard from '../CustomCard/CustomCard';
import { SvgIcon, Typography } from '@material-ui/core';
import FunnelIcon from '../../assets/img/icons/funnel.svg';
const useStyles = makeStyles((theme) => ({
    root: {
       
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '2fr 2fr 2fr ',
        gridTemplateRows: '300px 300px 300px 300px',
        gridGap: '25px'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    gridtitle: { 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    filter: {
        paddingTop: '15px',
        width: '120px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    wordpadding: {
        
    }
}));

export default function CustomGridList() {
    const classes = useStyles();
    // dummy data to test.
    const listing = [
        {
            title: "Benz",
            imgurl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mercedes-benz-cls-class-1591735006.jpg?crop=0.643xw:0.543xh;0.0994xw,0.416xh&resize=1200:*",
            postedBy: "yulong",
            category: "Car",
            price: "50,000"
        },
        {
            title: "Benz",
            imgurl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mercedes-benz-cls-class-1591735006.jpg?crop=0.643xw:0.543xh;0.0994xw,0.416xh&resize=1200:*",
            postedBy: "yulong",
            category: "Car",
            price: "50,000"
        },
        {
            title: "Benz",
            imgurl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mercedes-benz-cls-class-1591735006.jpg?crop=0.643xw:0.543xh;0.0994xw,0.416xh&resize=1200:*",
            postedBy: "yulong",
            category: "Car",
            price: "50,000"
        },
        {
            title: "Benz",
            imgurl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mercedes-benz-cls-class-1591735006.jpg?crop=0.643xw:0.543xh;0.0994xw,0.416xh&resize=1200:*",
            postedBy: "yulong",
            category: "Car",
            price: "50,000"
        },
        {
            title: "Benz",
            imgurl: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mercedes-benz-cls-class-1591735006.jpg?crop=0.643xw:0.543xh;0.0994xw,0.416xh&resize=1200:*",
            postedBy: "yulong",
            category: "Car",
            price: "50,000"
        }
    ]
    return (
        <div className={classes.root}>
            <div className={classes.gridtitle}>
                <Typography variant="h4">Explore</Typography>
                <div className={classes.filter}>
                    <span>Newest Posts</span>
                    <img src={FunnelIcon} width={15} height={15} alt="filter icon"/>
                </div>
            </div>
            <div className={classes.gridContainer}>
                {listing && listing.map((item) => <div><CustomCard {...item} /></div>)}
            </div>  
           
        </div>
    );
}
