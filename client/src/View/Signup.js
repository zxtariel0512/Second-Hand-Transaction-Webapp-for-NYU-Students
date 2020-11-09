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
import onBoardImg from "../Assets/img/onBoard.svg";
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
    },
    image: {
        paddingLeft:'100px',
        paddingTop:'100px',
        paddingBottom:'100px',
        width: '50%',
        minWidth: '300px',
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

const passwordValidation = `  At least one numeric character 
            At least one lower and upper alphabetic letter \n
 At lesat one special character\n
 At least 8 characters`;
export default function Signup(props) {
    const classes = useStyles();
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
    });
    
    /* useState hook to store server error message */
    const [serverErr, setserverErr] = useState("");
    async function handleOnSubmit(userinput) {
        // event.preventDefault();
        // Form validation

        // AWS Cognito integration here
        
        try {
            const user = {
                username: userinput['netid'],
                password: userinput['password'],
                attributes: {
                    name: userinput['name'],
                    email: userinput['netid'] + "@nyu.edu",
                    phone_number: userinput['phone'],
                    'custom:schoolYear': userinput['school-year'],
                    'custom:major': userinput['major']
                }
            }
            await Auth.signUp(user)
            alert('You have successfully registered! A verification email has been sent to your nyu email.');
            history.push('/login');
            var params = new URLSearchParams();
            params.append('valid', false);
            params.append('netid', user.username);
            params.append('username', user.username);
            params.append('name', user.attributes.name);
            params.append('credit', 100);
            params.append('password', user.password);
            params.append('phone', user.attributes.phone_number);
            params.append('schoolYear', Number(userinput['school-year']));
            params.append('major', userinput['major']);
            axios.post('http://localhost:4000/user/register', params)
                .then(res=> console.log(res.data));
        } catch (error) {
            // alert(error);
            setserverErr(error.message);
        }
    }
    console.log(errors)
    const getErrorMsg = (field) => {
        if (errors[field]) {
            if (errors[field].message === "") return undefined;
            return errors[field].message;
        }
        return undefined;
    }
    
    return (
        <div className={classes.main}>
            <img className={classes.image} src={onBoardImg} alt="side"/>
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
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            error={getErrorMsg("name") === undefined ? false : true}
                            helperText={getErrorMsg("name")}
                            
                            inputRef={register({
                                required: true,
                                /* firstname validation: 1-20 alphabetic characters
                                */
                                pattern: {
                                    value: /^[A-Za-z ]{1,20}$/,
                                    message: 'Invalid name'
                                }
                            })}
                        />

                        {/* <ErrorMessage errors={} name="name" as="p" style={{"color":"red"}} /> */}
                        
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            autoComplete="phone_number"
                            error={getErrorMsg("phone") === undefined ? false : true}
                            helperText={getErrorMsg("phone")}
                            placeholder="Starts with +1.."
                            inputRef={register({
                                required: true,
                                pattern: {
                                    value: /^[0-9+]{12}$/,
                                    message: 'Invalid phone number'
                                }
                            })}
                        />
                        {/* <ErrorMessage errors={errors} name="phone" as="p" /> */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="netid"
                            label="NYU NetId"
                            name="netid"
                            error={getErrorMsg("netid") === undefined ? false : true}
                            helperText={getErrorMsg("netid")}
                            inputRef={register({
                                required: true,
                                pattern: {
                                    value: /^[a-z]{2,3}\d{3,4}$/,
                                    message: 'Invalid netid'
                                }
                            })}
                        />
                        {/* <ErrorMessage errors={errors} name="netid" as="p" /> */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={getErrorMsg("password") === undefined ? false : true}
                            helperText={getErrorMsg("password")}
                            
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
                        
                            
                        <TextField
                            variant="outlined"
                            margin="normal"
                            
                            fullWidth
                            id="major"
                            label="Major"
                            name="major"
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
                            name="school-year"
                            inputRef={register({
                                required: false,
                            })}
                        />
                        {/* <ErrorMessage errors={errors} name="major" as="p"></ErrorMessage> */}
                        {/* render validation error from aws  */}
                        <p style={{"color":"red"}}>{serverErr}</p>
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
        </div>
    );
}
