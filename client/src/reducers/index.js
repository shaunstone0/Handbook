import { combineReducers } from 'redux';
import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_FAIL,
  FAQ_LOADED,
  FAQ_ERROR,
  MOST_VIEWS_LOADED,
  MOST_VIEWS_ERROR,
  LOGOUT_USER,
  LOGOUT_FAIL,
  GET_SINGLE_QUESTION,
  SINGLE_QUESTION_ERROR,
  CREATE_FAQ,
  CREATE_FAQ_ERROR,
  SET_ALERT,
  REMOVE_ALERT,
  PURGE,
} from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
  isAuthenticated: false,
};

const user_reducer = (state = initialUserState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        currentUser: payload.data,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload.data,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: payload.data,
        isLoading: false,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};

const initialFaqState = {
  faqs: [],
  isLoading: true,
};

const faq_reducer = (state = initialFaqState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FAQ_LOADED:
      return {
        ...state,
        faqs: payload.data,
        isLoading: false,
      };
    case FAQ_ERROR:
      return {
        initialFaqState,
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};

const initialViewedState = {
  mostViewed: [],
};

const most_viewed_reducer = (state = initialViewedState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOST_VIEWS_LOADED:
      return {
        ...state,
        mostViewed: payload.data,
      };
    case MOST_VIEWS_ERROR:
      return {
        mostViewed: [],
      };
    default: {
      return state;
    }
  }
};

const initialSingleState = {
  singleFaq: {},
};

const single_faq_reducer = (state = initialSingleState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SINGLE_QUESTION:
      return {
        singleFaq: payload.data,
      };
    case SINGLE_QUESTION_ERROR:
      return {
        state,
      };
    case PURGE:
      return {
        singleFaq: {},
      };
    default: {
      return state;
    }
  }
};

const initialAlertState = [];

const alert_reducer = (state = initialAlertState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  user: user_reducer,
  faqs: faq_reducer,
  mostViewed: most_viewed_reducer,
  singleFaq: single_faq_reducer,
  alert: alert_reducer,
});

export default rootReducers;
