import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { SetUserDataContext, UserDataContext } from '../Context/UserProfileContext';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../Redux/actions';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const currentPath = useLocation();
    const userData = useContext(UserDataContext);
    const userDataFromStore = useSelector(state => state.currentUserProfile || {});
    const userProfile = userData || userDataFromStore;
    const setUserData = useContext(SetUserDataContext);    

    const handleLogout = () => {
        setUserData(undefined);
        dispatch(setCurrentUser({}));
        nevigate('/');
    }

    return (
        <>
            {currentPath.pathname !== '/' && currentPath.pathname !== '/signup' && userProfile?.authenticated &&
                (<Box style={{ float: 'right' }}>
                    <Button variant='contained' color='primary' onClick={handleLogout}>Logout</Button>
                </Box>)
            }
        </>
    )
}

export default Logout;