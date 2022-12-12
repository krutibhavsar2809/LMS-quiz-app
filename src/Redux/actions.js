import { SET_CURRENT_USER, SET_QUIZ_LIST } from "./actionTypes";

export const setQuizList = (payload) => ({
    type: SET_QUIZ_LIST,
    payload,
});

export const setCurrentUser = (payload) => ({
    type: SET_CURRENT_USER,
    payload,
});