import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { FormControl, Typography, RadioGroup, FormControlLabel, Radio, Card, Button, CardContent, Box } from "@mui/material";
import FinalScreen from '../Components/Result/FinalScreen';
import { getItemFromLocalStorage } from '../Components/Common/Helper';

const Questions = () => {
    const list = useSelector(state => state.quizList || []);
    const questionsList = getItemFromLocalStorage('questionList');
    const quizList = list.length > 0 ?  list : questionsList;
    let timerId;

    const [progress, setProgress] = useState(30);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timerId = setInterval(() => {
            setProgress((oldProgress) => { // to start timer
                if (oldProgress > 0) {
                    return oldProgress - 1;
                } else {
                    return oldProgress;
                }
            });
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        if (progress === 0 ) {
            clearInterval(timerId); // on progress 0 reset counter
            if (currentQuestionIndex < quizList.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1); // change the next question on counter set to 0
                if (currentQuestionIndex !== quizList.length - 1) {
                    setProgress(30); // initiate cunter again for next question
                }
            }
        }
    }, [currentQuestionIndex, progress, quizList, score, timerId]);

    const handleSelectValue = (e, index) => {
        if ((e.target.value).toLowerCase() === (quizList[index]['answer']).toLowerCase()) {
            setScore(score + 1); // set score if selected option matches to the answer
        }
    };

    const handleSubmitAnswer = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // increment current index to change the question
        setProgress(30); // initiate counter when user manually click on next button
    };

    if (quizList.length === 0) {
        return (
            <Typography>Oops, Quiz not found. <br />Seems like quiz is not set by admin yet!</Typography>
        );
    }

    return (
        <Card>
            <CardContent>
                {quizList?.map((list, index) => (
                    currentQuestionIndex === index &&
                    (
                        <Box key={`question_${index + 1}`}>
                            <Typography variant="h6">Question {index + 1}</Typography>
                            <Typography>{list.question}</Typography>
                            <FormControl>
                                <RadioGroup onChange={(e) => handleSelectValue(e, index)} defaultValue="">
                                    {list.options.map((opt) => (
                                        <FormControlLabel value={opt.option} control={<Radio color="primary" />} label={<Typography>{opt.option}</Typography>} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <Typography>{ `${index + 1} / ${quizList.length}`}</Typography>
                            <Box mt={5}>
                                <Button variant="contained" color="primary" onClick={handleSubmitAnswer}>{quizList.length - 1 === index ? 'Submit': 'Next'}</Button>        
                            </Box>
                            <Typography>{`Time left: ${progress} seconds / 30 seconds`}</Typography>
                        </Box>
                    )
                ))}
                {currentQuestionIndex === quizList.length &&
                    <FinalScreen score={score} totalQue={quizList.length} />
                }
            </CardContent>
        </Card>
    );
};

export default Questions;