import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: 'FETCH_ALL', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deletePost = (id) => async (dispatch) => {
  try {
    await await api.deletePost(id);

    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const findMatch = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const { data } = await api.findMatch(id);

    dispatch({ type: 'FIND_MATCH', payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const sendVote = (win, lose, id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  try {
    const { data } = await api.sendVote(win._id,lose._id,id);

 
  } catch (error) {
    console.log(error);
  }
};