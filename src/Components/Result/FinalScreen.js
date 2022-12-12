import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FinalScreen = ({ score, totalQue }) => {
    const navigate = useNavigate();
    const handleRetryQuiz = () => {
        navigate('/home');
    }
    const covertScoreToPersentage = () => {
        return Math.round((100 * score) / totalQue);
    }
    const handleScore = () => {
        if (covertScoreToPersentage() < 70) {
            return (<>
                <Typography variant='h4'>You scored {covertScoreToPersentage()}%</Typography>
                <Typography>Oops, you didnt passed this quiz. Please try again!<br/>You need to score atleast 70% to pass this quiz.</Typography>
            </>)
        } else {
            return (<>
                <Typography>You scored {covertScoreToPersentage()}%</Typography>
                <Typography>Congratulations! You passed the quiz.</Typography>
            </>)
        }
    }
    return (
        <>
            {handleScore()}
            <Box mt={5}>
                <Button variant="contained" color="primary" onClick={handleRetryQuiz}>Go to home</Button>
            </Box>
        </>
        
    );
};

export default FinalScreen;