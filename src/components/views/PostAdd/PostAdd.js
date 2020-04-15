import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ImageUploader from 'react-images-upload';


import { connect } from 'react-redux';
import { getUser } from '../../../redux/loginRedux';
import { addPost, getAll } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({ className, addPost, user }) => {

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = day + '.' + month + '.' + year;


  const titleProps = {
    minLength: 10,
  };

  const contentProps = {
    minLength: 20,
  };
  const [post, setPost] = React.useState({
    author: user.mail,
    title: '',
    text: '',
    created: date,
    phone: '',
    price: '',
    location: '',
    photo: null,
    updated: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('addPost', post);
    await addPost(post);
  };

  const handleChange = async (event, name) => {
    await setPost({
      ...post,
      [name]: event.target.value,
    });
  };
  const setPhoto = ( files ) => {
    console.log('setphoto', files);
    if (files) setPost({ ...post, photo: files[0] });
  };

  /*const setImage = ({ target }) => {
    const { files } = target;

    if (files) setPost({ ...post, photo: files[0] });
  };*/

  if(user.logged) {
    return (
      <Container className={clsx(className, styles.root)}>
        <Card className={styles.card}>
          <CardHeader title="Add new post"/>
          <form className={styles.form} autoComplete="off" onSubmit={e => handleSubmit(e)}>
            <div>
              <p>author: {user.mail} </p>
            </div>
            <TextField
              id="title"
              label="Title"
              required
              inputProps={titleProps}
              value={post.title}
              onChange={e => handleChange(e, 'title')}
            />
            <TextField
              id="price"
              label="Price"
              type="number"
              value={post.price}
              onChange={e => handleChange(e, 'price')}
            />
            <TextField
              variant="outlined"
              multiline
              id="text"
              label="Text"
              inputProps={contentProps}

              placeholder="Write your post here"
              rows="10"
              required
              value={post.text}
              className={styles.textProps}
              onChange={e => handleChange(e, 'text')}
            />
            <TextField
              id="phone"
              label="Phone number"
              type="number"
              value={post.phone}
              onChange={e => handleChange(e, 'phone')}
            />
            {/*<Button variant="contained" component="label" className={styles.button}>
              Upload picture
              <input type="file" accept="photo/*" style={{ display: 'none' }} onChange={setPhoto} />
              </Button>*/}
            <ImageUploader
              withIcon={true}
              buttonText='Choose image'
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
              withPreview={true}
              onChange={setPhoto}
              singleImage={true}
              //className={(photo.file) ? 'hide' : 'animated fadeInUp'}
            />
            <InputLabel id="demo-simple-select-label" className={styles.select}>Status</InputLabel>
            <Select
              labelId="post-status-label"
              value={post.status}
              id="post-status-select"
              onChange={e => handleChange(e, 'status')}

            >
              <MenuItem value={'draft'}>draft</MenuItem>
              <MenuItem value={'published'}>published</MenuItem>
              <MenuItem value={'closed'}>closed</MenuItem>
            </Select>
            <Button type="submit" color="secondary" variant="contained" className={styles.button}>Save</Button>
          </form>
        </Card>
      </Container>
    );
  } else {
    return (
      <Container className={styles.root}>
        <Card className={styles.container}>
          <h3>Login to add new post!</h3>
        </Card>
      </Container>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  addPost: PropTypes.func,
  user: PropTypes.object,


};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: payload => dispatch(addPost(payload)),

});




const PostAddContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  PostAddContainer as PostAdd,
  Component as PostAddComponent,
};