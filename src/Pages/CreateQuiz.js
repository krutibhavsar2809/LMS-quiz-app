import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, CardContent, FormControl, Button, Box, Link } from '@mui/material';
import Question from '../Components/CreateQuiz/Question';
import { setQuizList } from '../Redux/actions';
import { UserDataContext } from '../Components/Context/UserProfileContext';
import { getItemFromLocalStorage, isAdmin, setItemToLocalStorage } from '../Components/Common/Helper';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const nevigate = useNavigate();
    const userData = useContext(UserDataContext);
    const userDataFromStore = useSelector(state => state.currentUserProfile || {});
    const userProfile = userData || userDataFromStore;
    const quizList = useSelector(state => state.quizList || []);
    const dispatch = useDispatch();

    const [questionSize, setQuestionSize] = useState(0);
    const [totalQuestionsList, setTotalQuestionsList] = useState([]);
    const [questionsData, setQuestionsData] = useState({
        questionType: '',
        question: '',
        answer: '',
        options: [{ 'option': ''}],
    });

    useEffect(() => {
        const questionsList = getItemFromLocalStorage('questionList');
        setTotalQuestionsList(quizList.length > 0 ?  quizList : questionsList);
    }, [quizList]);

    const clearQuestionData = () => { // clear input fields to add new question
        setQuestionsData({
            questionType: '',
            question: '',
            answer: '',
            options: [{ 'option': ''}],
        });
    }

    const handleAddQuestion = () => {
        setQuestionSize(questionSize + 1); // increment to count total number of questions added

        const tempArr = totalQuestionsList;
        tempArr.push(questionsData);
        setTotalQuestionsList(tempArr); // create array of questions created

        clearQuestionData(); // clear input fields to add another question
    }

    const handleQuestionsData = (e, key, index) => {
        if (key === 'options') {
            const {name, value} = e.target;
            const list = [ ...questionsData.options ];
            list[index][name] = value;
            setQuestionsData({
                ...questionsData,
                options: [ ...list ],
            });
        } else {
            setQuestionsData({
                ...questionsData,
                [key]: e.target.value,
            });
        }
    }

    const handleAddOptions = () => {
        const list = [ ...questionsData.options ];
        list.push({ 'option': ''});
        setQuestionsData({ 
            ...questionsData,
            options: [ ...list ],
        });
    };

    const removeOptions = (index) => {
        const list = [ ...questionsData.options];
        list.splice(index, 1);
        setQuestionsData({
            ...questionsData,
            options: [ ...list ],
        });
    }

    const submitQuiz = () => {
        dispatch(setQuizList(totalQuestionsList)); // saving quiz data to redux
        setItemToLocalStorage('questionList', totalQuestionsList); // saving quiz data to local storage
        nevigate('/home');
    }

    if (!isAdmin(userProfile.email, userProfile.password)) {
        return (
            <>
                <Typography>Oops, you dont have access to this page!</Typography>
                <Link variant='contained' color='primary' href='/home'>Go to Home</Link>
            </>
        );
    }

    return (
        <>
            <Typography variant='h5'>Welcome {userProfile.firstName} {userProfile.lastName}</Typography>
            <Typography variant='h3'>Create quiz</Typography>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <FormControl fullWidth>
                    <>
                        <Question questionsData={questionsData} handleQuestionsData={handleQuestionsData} handleAddOptions={handleAddOptions} removeOptions={removeOptions} />
                        <Box mt={2}>
                            <Button variant="contained" color="primary" onClick={handleAddQuestion}>Add More Questions</Button>
                        </Box>
                    </>
                    </FormControl>
                </CardContent>
            </Card>
            {totalQuestionsList.length > 0
                && (
                    <>
                        <Card style={{ textAlign: 'left', marginTop: '20px', padding: '5px'}}>
                            <ol>
                                {
                                    totalQuestionsList.map((list) => (
                                        <li style={{ marginBottom: '10px' }}>
                                            <Box>Question type: {list.questionType}</Box>
                                            <Box>Question: {list.question}</Box>
                                            <Box>Answer: {list.answer}</Box>
                                            <Box>Options: {list.options.map((singleOption) => (<ul><li>{singleOption.option}</li></ul>))}</Box>
                                        </li>
                                    ))
                                }
                            </ol>
                        </Card>
                        <Box mt={2}>
                            <Button variant='contained' color='primary' onClick={submitQuiz}>Review and submit quiz questions</Button>
                        </Box>
                    </>
                )
            }
        </>
    )
}

export default CreateQuiz;