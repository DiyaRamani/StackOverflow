import * as api from "../api/index";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/");
    if(data ==='0')alert('Upgrade ur Plan for Asking few more questions')
    else{dispatch({type: "ADD_POINTS",payload:data})}
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllQuestions = () => async (disptach) => {
  try {
    const { data } = await api.getAllQuestions();
    disptach({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id, userId, navigate) => async (dispatch) => {
  try {
    const {data} = await api.deleteQuestion(id,userId);
    localStorage.setItem('point', data);
    dispatch(fetchAllQuestions());
    dispatch({type: "ADD_POINTS",payload:data})
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const {data} = await api.voteQuestion(id, value, userId);
    dispatch(fetchAllQuestions());
    dispatch({type: "ADD_POINTS",payload:data})
  } catch (error) {
    console.log(error);
  }
};

export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { userId, id, noOfAnswers, answerBody, userAnswered } = answerData;
    const { data } = await api.postAnswer(
      userId,
      id,
      noOfAnswers,
      answerBody,
      userAnswered
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    localStorage.setItem('point', data);
    dispatch(fetchAllQuestions());
    dispatch({type: "ADD_POINTS",payload:data})
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers, userId) => async (dispatch) => {
  try {
    const {data} = await api.deleteAnswer(id, answerId, noOfAnswers,userId);
    localStorage.setItem('point', data);
    dispatch(fetchAllQuestions());
    dispatch({type: "ADD_POINTS",payload:data})
  } catch (error) {
    console.log(error);
  }
};
