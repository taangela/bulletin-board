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
import shortid from 'shortid';

import { connect } from 'react-redux';
import { getAll, addPost } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/loginRedux';

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
    id: shortid.generate(),
    date: date,
    mail: user.mail,
    userId: user.id,
    author: user.author,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost(post);
  };

  const handleChange = async (event, name) => {
    await setPost({
      ...post,
      [name]: event.target.value,
    });
  };

  if(user.logged) {
    return (
      <Container className={clsx(className, styles.root)}>
        <Card className={styles.card}>
          <CardHeader title="Add new post"/>
          <form className={styles.form} autoComplete="off" onSubmit={e => handleSubmit(e)}>
            <div>
              <p>mail: {user.mail} </p>
              <p>author: {user.author} </p>
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
              id="content"
              inputProps={contentProps}
              label="Content"
              placeholder="Write your post here"
              rows="10"
              required
              value={post.content}
              className={styles.content}
              onChange={e => handleChange(e, 'content')}
            />
            <TextField
              id="phone"
              label="Phone number"
              type="number"
              value={post.phone}
              onChange={e => handleChange(e, 'phone')}
            />
            <Button variant="contained" component="label" className={styles.button}>
              Upload picture
              <input type="file" accept="image/*" style={{ display: 'none' }}  onChange={e => handleChange(e, 'image')} />
            </Button>
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
  addPost: post => dispatch(addPost(post)),
});

const PostAddContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  PostAddContainer as PostAdd,
  Component as PostAddComponent,
};