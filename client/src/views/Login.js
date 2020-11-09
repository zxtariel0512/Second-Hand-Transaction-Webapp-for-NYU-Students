import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router";
import request from '../utils/request';
// styling
const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
    },
    image: {
        width: '40%',
        minWidth: '500px',
        height: '100vh'
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        marginTop: '10px',
        color: 'red'
    }
}));


// Login page
export default function Login(props) {
    const history = useHistory();
    const classes = useStyles();
    // third-party validation, check validity once input is changed
    const { register, handleSubmit } = useForm({
        mode: 'onBlur',
    });
    /* useState hook to store server error message */
    const [serverErr, setserverErr] = useState("");

    /* call aws cognito api to authenticate user */
    async function handleOnSubmit(userinput) {

        try {
            const user = await Auth.signIn(userinput['netid'], userinput['password']);
            console.log(user);  
            setserverErr("");
            await request({
                url: `/user/${userinput['netid']}`,
                method: 'Put',
            });
            
            history.push("/home");
        } catch (error) {
            console.log(error);
            setserverErr(error.message);
        }
    }

    return (
        <div className={classes.main}>
            <img className={classes.image} src="./img/bg.jpg" alt="side" />
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="netid"
                        label="NYU netid "
                        name="netid"
                        autoComplete="netid"
                        autoFocus
                        inputRef={register({
                            required: true,
                        })}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="password"
                        inputRef={register({
                            required: true,
                        })}
                    />
                    {/* render validation error from aws  */}

                    <p style={{"color":"red"}}>{serverErr}</p>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
        </div>
    );
}
