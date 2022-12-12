import { SET_CURRENT_USER, SET_QUIZ_LIST } from './actionTypes';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const initialState = {
    quizList: [],
    currentUserProfile: {},
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_QUIZ_LIST:
            return {
                ...state,
                quizList: action.payload,
            }
        case SET_CURRENT_USER:
            return {
                currentUserProfile: action.payload,
            }
        default:
            return state;
    }
}

const persistConfig = {
    key: 'quiz',
    storage: storage,
  };

export default persistReducer(persistConfig, reducer);