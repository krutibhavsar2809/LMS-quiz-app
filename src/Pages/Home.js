import React, { useContext } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { UserDataContext } from "../Components/Context/UserProfileContext";

const Home = () => {
    const userData = useContext(UserDataContext);
    const userDataFromStore = useSelector(state => state.currentUserProfile || {});
    const userProfile = userData || userDataFromStore;
    const nevigate = useNavigate();

    const handleStartQuiz = () => {
        if (typeof window !== 'undefined') {
            nevigate('/questions');
        }
    }

    return (
        <Box mt={5}>
            <Typography variant="h2" fontWeight='bold'>Quiz App</Typography>
            <Typography>Hi {userProfile.firstName} {userProfile.lastName}</Typography>
            <Typography>Lets get started with quiz</Typography>
            <Box mt={5}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStartQuiz}
                >
                    Start Quiz
                </Button>
            </Box>
        </Box>
    )
};

export default Home;