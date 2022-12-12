import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, TextField, Box, Typography, FormControl, Button, Link } from '@mui/material';
import { decrypt, getItemFromLocalStorage, isAdmin } from '../Components/Common/Helper';
import { SetUserDataContext } from '../Components/Context/UserProfileContext';
import { setCurrentUser } from '../Redux/actions';

const Login = () => {
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    const email = useRef('');
    const password = useRef('');
    const [errorsText, setErrorsText ] = useState({
        genericError: '',
        emailErrorText: '',
        passwordErrorText: '',
    });
    const [isError, setIsError] = useState(false);
    const setUserData = useContext(SetUserDataContext);    

    useEffect(() => {
        // To validate all the required field of form
        const validForm = Object.entries(errorsText).filter(([key]) => errorsText[key] !== '');
        if (validForm.length > 1) {
            setIsError(true);
        }
    }, [errorsText]);

    const clearError = () => {
        setIsError(false);
        setErrorsText({
            genericError: '',
            emailErrorText: '',
            passwordErrorText: '',
        });
    }

    const handleValidation = () => {
        const emailId = email.current.value;
        const pswd = password.current.value;

        if (emailId === '' && pswd === '') {
            setErrorsText((prevStates) => ({ ...prevStates, emailErrorText: 'Please enter email id' }));
            setErrorsText((prevStates) => ({ ...prevStates, passwordErrorText: 'Please enter password'}));
            return false;
        } else if (emailId === '') {
            setErrorsText({ ...errorsText, emailErrorText: 'Please enter email id' });
            return false
        } else if (pswd === '') {
            setErrorsText({ ...errorsText, passwordErrorText: 'Please enter password' });
            return false;
        }

        if (emailId !== '') {
            const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
            const isEmailValid = regex.test(emailId);
            if (!isEmailValid) {
                setErrorsText({ ...errorsText, emailErrorText: 'Please enter valid email id' });
                return false;
            }
        }
        if (pswd !== '') {
            console.log('inside wrong password');
            const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/g;
            const isPasswordValid = regex.test(pswd);
            console.log('isPasswordValid', isPasswordValid);
            if (!isPasswordValid) {
                setErrorsText({ ...errorsText, passwordErrorText: 'Your password must contains atleast number, special charecter, capital letter, small letters and min 8 charecters' });
                return false;
            }
        }
        return true;
    };

    const handleLogin = () => {
        const isValidated = handleValidation();
        if (isValidated) {
            const registeredUserData = getItemFromLocalStorage('registeredUsersList') || [];
            const filteredData = registeredUserData?.filter((a) => (a.email === email.current.value && decrypt(a.password) === password.current.value));
            if (filteredData.length === 1) {
                setUserData(filteredData[0]); // setting current user to context
                dispatch(setCurrentUser(filteredData[0])); // setting current user redux
                const { email, password } = filteredData[0];
                if (isAdmin(email, password)) {
                    nevigate('/createquiz');
                } else {
                    nevigate('/home');
                }
            } else {
                setErrorsText({ ...errorsText, genericError: 'Oops, User not found!' });
            }
        }
    }

    return (
        <Card>
            <Box mt={5} mr={2} ml={2} mb={2}>
                <Typography variant='h4'>Login</Typography>
                <FormControl fullWidth>
                    <TextField variant='outlined' label='email' type='email' style={{ marginTop: '10px'}} inputRef={email} required error={errorsText.emailErrorText !== ''} helperText={errorsText.emailErrorText} onFocus={clearError} />
                    <TextField variant='outlined' label='password' type='password' style={{ marginTop: '10px'}} inputRef={password} required error={errorsText.passwordErrorText !== ''} helperText={errorsText.passwordErrorText} onFocus={clearError} />
                    {isError && errorsText.genericError !== '' && (<Typography style={{ color: 'red', marginTop: '10px' }}>{errorsText.genericError}</Typography>)}
                    <Button variant='contained' color="primary" style={{ marginTop: '10px', marginBottom: '10px'}} onClick={handleLogin}>Login</Button>
                </FormControl>
                <Typography>Don't have an account? <Link href='/signup'>Create one</Link></Typography>
            </Box>
        </Card>
    )
}

export default Login;