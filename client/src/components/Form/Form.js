import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createPost, updatePost, deletePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId, items, setItems, tier, setTier }) => {
  const [postData, setPostData] = useState({ title: '',selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.tierlist.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [tierData, setTierData] = useState({title: '', cover: ''});


  const add = () => {
    setTier({...tier, elements: tier.elements.concat([{title: postData.title, image: postData.selectedFile, rating: 1000}])});
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ elements: tier.elements, name: user?.result?.name, title: tierData.title, cover: tierData.cover}));
      clear();
    } else {
      dispatch(updatePost(currentId, { elements: tier.elements, name: user?.result?.name, title: tierData.title}));
      clear();
    }
    history.push('/');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (post) {
      dispatch(deletePost(post._id));
    }
    
    history.push('/');
  }


  if (post && post.creator != user?.result?._id) {
    return (<></>);
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Sign in to create or edit a tier list.
        </Typography>
      </Paper>
    );
  }



  return (
    <>
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
        <Typography variant="h6">Add an element</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button variant="contained" color="secondary" size="small" onClick={add} fullWidth>Add</Button>
      </form>
    </Paper>
    <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Create a new tier list'}</Typography>
      <TextField name="title" variant="outlined" label="Title" fullWidth value={tierData.title} onChange={(e) => setTierData({...tierData, title: e.target.value})} />
      <Typography variant="h6">Cover Photo</Typography>
      <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setTierData({ ...tierData, cover: base64 })} /></div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
    </form>
    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={(e) => {handleDelete(e)}}>
         Delete
        </Button>
        )}
  </Paper>

  </>
  );
};

export default Form;
