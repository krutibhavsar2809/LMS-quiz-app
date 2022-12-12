import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import LoadingView from '../Common/LoadingView';
import { UserDataContext } from '../Context/UserProfileContext';

/* eslint-disable react/jsx-props-no-spreading */
const ProtectedRoute = () => {
    const nevigate = useNavigate();
    const userData = useContext(UserDataContext);
    const userDataFromStore = useSelector(state => state.currentUserProfile || {});
    const userProfile = userData || userDataFromStore;

    useEffect(() => {
        if (!userProfile?.authenticated) {
            nevigate('/');
        }
    },[nevigate, userProfile]);

    return (!userProfile.authenticated ? <LoadingView /> : <Outlet />);
};

export default ProtectedRoute;
