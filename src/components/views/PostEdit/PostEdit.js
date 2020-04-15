import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';


import { connect } from 'react-redux';
import { getPostById, updatePost } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/loginRedux';


import styles from './PostEdit.module.scss';

const Component = ({ className, updatePost, user, propsPost }) => {

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const updateDateString = day + '.' + month + '.' + year;

  const [post, setPost] = React.useState({
    ...propsPost,
    updated: updateDateString,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(post);
  };

  const handleChange = async (event, name) => {
    await setPost({
      ...post,
      [name]: event.target.value,
    });
  };

  if (user.logged) {
    return (
      <Container className={clsx(className, styles.root)}>
        <Card className={styles.card}>
          <CardHeader title="Edit your post!" />
          <form className={styles.form} onSubmit={e => handleSubmit(e)}>
            <div>
              <p>author: {user.mail} </p>
            </div>

            <TextField
              required
              id="post"
              label="Title"
              minLength="10"
              placeholder="Write min. 10 characters here"
              value={post.title}
              onChange={e => handleChange(e, 'title')}
              className={styles.textField}
            />
            <TextField
              id="post"
              label="Price"
              className={styles.textField}
              type="number"
              value={post.price}
              onChange={e => handleChange(e, 'price')}
            />
            <TextField
              required
              variant="outlined"
              multiline
              rows="10"
              id="post-text"
              label="Description"
              minLength="20"
              placeholder="Write min. 20 characters here"
              className={styles.textField}
              value={post.text}
              onChange={e => handleChange(e, 'text')}
            />
            <TextField
              id="post-phone"
              label="Phone number"
              className={styles.textField}
              value={post.phone}
              onChange={e => handleChange(e, 'phone')}
            />
            <InputLabel className={styles.select}>Status</InputLabel>
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
            <Button variant="contained" component="label" className={styles.button}>
              Upload picture
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleChange(e, 'image')} />
            </Button>
            <Button type="submit" color="secondary" variant="contained" className={styles.button}>Save</Button>
          </form>
        </Card>
      </Container>
    );
  } else {
    return (
      <Container className={styles.root}>
        <Card className={styles.container}>
          <h3>Login to edit your post!</h3>
        </Card>
      </Container>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  updatePost: PropTypes.func,
  user: PropTypes.object,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state, props) => ({
  propsPost: getPostById(state, props.match.params.id),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  updatePost: post => dispatch(updatePost(post)),
});

const PostEditContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  ///Component as PostEdit,
  PostEditContainer as PostEdit,
  Component as PostEditComponent,
};

