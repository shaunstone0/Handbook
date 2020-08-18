import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
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
  UPDATE_FAQ,
  UPDATE_ERROR,
  DELETE_ENTRY,
  DELETE_ERROR,
} from './types';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
    }
    return error;
  }
);

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/auth/user');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const loginUser = (lastname, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ lastname, password });

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    if (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/auth/logout');
    dispatch({ type: LOGOUT_USER, payload: res.data });
  } catch (err) {
    if (err) {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  }
};

//FAQ

export const getAllQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/faq');
    dispatch({
      type: FAQ_LOADED,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: FAQ_ERROR,
      });
    }
  }
};

export const getMostViewsQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/faq/?views[gte]=5&limit=6');
    dispatch({
      type: MOST_VIEWS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: MOST_VIEWS_ERROR,
      });
    }
  }
};

export const getQuestionById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/faq/${id}`);

    dispatch({
      type: GET_SINGLE_QUESTION,
      payload: res.data,
    });
  } catch (err) {
    if (err) {
      dispatch({
        type: SINGLE_QUESTION_ERROR,
      });
    }
  }
};

export const createFaq = (question, answer, category) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ question, answer, category });

  try {
    const res = await axios.post('/api/v1/faq/create', body, config);
    dispatch({ type: CREATE_FAQ, payload: res.data });
  } catch (err) {
    if (err) {
      dispatch({
        type: CREATE_FAQ_ERROR,
      });
    }
  }
};

export const updateFaq = (question, answer, category, id) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ question, answer, category, id });
  try {
    const res = await axios.put(`/api/v1/faq/${id}`, body, config);
    dispatch({
      type: UPDATE_FAQ,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_ERROR,
    });
  }
};

export const deleteFaq = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/admin/faq/delete/${id}`);
    dispatch({
      type: DELETE_ENTRY,
    });
    dispatch(setAlert('Entry Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_ERROR,
    });
  }
};

// Alerts
export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
