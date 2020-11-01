import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';


const useStyles = makeStyles((theme) => ({
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
const passwordValidation = `  1. at least one numeric character \n
  2. at least one lowercase alphabetic letter \n
	3. at least one uppercase alphabetic letter \n
	4. at lesat one special character \n
	5. min length 8 and max length 20`;
export default function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
    });
    /* useState hook to store server error message */
    const [serverErr, setserverErr] = useState("");
    async function handleOnSubmit(userinput) {
        // event.preventDefault();
        // Form validation

        // AWS Cognito integration here
        try {
            await Auth.signUp({
                username: userinput['email'],
                password: userinput['password'],
                attributes: {
                    family_name: userinput['firstname'],
                    given_name: userinput['lastname'],
                    description: userinput['description']

                }
            })
            alert('You have successfully registered an account! A verification email has been sent.');
            history.push('/login');
        } catch (error) {
            // alert(error);
            setserverErr(error.message);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(handleOnSubmit)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="Frist Name"
                        name="firstname"
                        autoComplete="given-name"
                        autoFocus
                        inputRef={register({
                            required: true,
                            /* firstname validation: 1-20 alphabetic characters
                            */
                            pattern: {
                                value: /^[A-Za-z]{1,20}$/,
                                message: 'Invalid first name'
                            }
                        })}
                    />

                    <ErrorMessage errors={errors} name="firstname" as="p" />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="family-name"
                        autoFocus
                        inputRef={register({
                            required: true,
                            /* firstname validation: 1-20 alphabetic characters
                            */
                            pattern: {
                                value: /^[A-Za-z]{1,20}$/,
                                message: 'Invalid last name'
                            }
                        })}
                    />
                    <ErrorMessage errors={errors} name="lastname" as="p" />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={register({
                            required: true,
                            pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Invalid email address'
                            }
                        })}
                    />
                    <ErrorMessage errors={errors} name="email" as="p" />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        inputRef={register({
                            required: true,
                            /* password validation:
                                1. at least one numeric character
                                2. at least one lowercase alphabetic letter
                                3. at least one uppercase alphabetic letter
                                4. at lesat one special character
                                5. min length 8 and max length 20
                            */
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
                                message: passwordValidation
                            }
                        })}
                    />
                    {errors.password && errors.password.message.split('\n').map(err => <p style={{ lineHeight: '3px' }}>{err}</p>)}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password-cofirm"
                        label="Confirm Password"
                        type="password"
                        id="password-confirm"
                        inputRef={register({
                            required: true,
                            // validate: {
                            //   value: value => value === 'Wuhaodong250382!',
                            //   message: `Passwords doesn't match`
                            // }
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name="password-confirm" as="p"></ErrorMessage> */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        
                        fullWidth
                        id="major"
                        label="Major"
                        name="major"
                        autoFocus
                        inputRef={register({
                            required:false, 
                        })}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"

                        fullWidth
                        id="school-year"
                        label="School Year"
                        name="School Year"
                        autoFocus
                        inputRef={register({
                            required: false,
                        })}
                    />
                    {/* <ErrorMessage errors={errors} name="major" as="p"></ErrorMessage> */}
                    {/* render validation error from aws  */}
                    <p>{serverErr}</p>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
           
        </Container>
    );
}
