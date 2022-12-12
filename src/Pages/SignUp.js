import React, { useRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Card, TextField, Box, Typography, FormControl, Button, Link, Grid } from '@mui/material';
import { SetUserDataContext } from '../Components/Context/UserProfileContext';
import { setCurrentUser } from '../Redux/actions';
import { encrypt, getItemFromLocalStorage, setItemToLocalStorage } from '../Components/Common/Helper'; 

const SignUp = () => {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');

    const setUserData = useContext(SetUserDataContext);

    const handleSignUp = () => {
        const payload = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
            password: encrypt(password.current.value), // need to mask this
            authenticated: true,
        };
        setUserData(payload); // setting to context to use it locally

        dispatch(setCurrentUser(payload)); // setting to redux to use when page got refreshed

        const registeredUserData = getItemFromLocalStorage('registeredUsersList'); // getting registered userlist to preserve total number of registered users
        if (registeredUserData && registeredUserData.length >= 1) {
            setItemToLocalStorage('registeredUsersList', [...registeredUserData, payload]); // updating registered user list to local storage
        } else {
            setItemToLocalStorage('registeredUsersList', [payload]) // settng registered user list
        }

        if (email.current.value === 'kruti@gmail.com' && password.current.value === '@Test123') {
            nevigate('/createQuiz');
        } else {
            nevigate('/home');
        }
    };

    return (
        <Card>
            <Box mt={5} mr={2} ml={2} mb={2}>
                <Typography variant='h4'>SignUp</Typography>
                <FormControl>
                    <Grid container spacing={2} style={{ marginTop: '10px'}}>
                        <Grid item xs={6} sm={6} md={6}>
                            <TextField variant='outlined' label='First name' type='text' inputRef={firstName} value={firstName.current.value} />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6}>
                            <TextField variant='outlined' label='Last name' type='text' inputRef={lastName} value={lastName.current.value} />
                        </Grid>
                    </Grid>
                    <TextField variant='outlined' label='Email' type='email' style={{ marginTop: '10px'}} inputRef={email} value={email.current.value} />
                    <TextField variant='outlined' label='Password' type='password' style={{ marginTop: '10px'}} inputRef={password} value={password.current.value} />
                    <Button onClick={handleSignUp} variant='contained' color="primary" style={{ marginTop: '10px', marginBottom: '10px'}}>
                        Sign up
                    </Button>
                </FormControl>
                <Typography>Already have an account? <Link href='/'>Please do sign in</Link></Typography>
            </Box>
        </Card>
    )
}

export default SignUp;