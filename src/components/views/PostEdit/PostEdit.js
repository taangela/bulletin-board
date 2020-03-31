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
import { getAll, updatePost} from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';

const Component = ({ className, posts, updatePost, match }) => {
 
  const postArray = posts.filter(el => el.id === match.params.id);

  const [post, setPost] = React.useState(postArray[0]);

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

  return( 
    <Container className={clsx(className, styles.root)}>
      <Card className={styles.card}>
        <CardHeader title="Edit your post!"/>
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
          <TextField
            required
            id="post-title"
            label="Title"
            minLength="10"
            placeholder="Write min. 10 characters here"
            value={post.title}
            onChange={e => handleChange(e, 'title')}
            className={styles.textField}
          />
          <TextField
            id="post-price"
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
            id="post-content"
            label="Description"
            minLength="20"
            placeholder="Write min. 20 characters here"
            className={styles.textField}
            value={post.content}
            onChange={e => handleChange(e, 'content')}
          />
          <TextField
            required
            id="post-mail"
            label="E-mail"
            className={styles.textField}
            value={post.mail}
            onChange={e => handleChange(e, 'mail')}
          />
          <TextField
            id="post-phone"
            label="Phone number"
            className={styles.textField}
            value={post.phone}
            onChange={e => handleChange(e, 'phone')}
          />
          <InputLabel id="demo-simple-select-label"  className={styles.select}>Select</InputLabel>
          <Select
            labelId="post-status-label"
            value="status"
            id="post-status-select"
          >
            <MenuItem value={'draft'}>draft</MenuItem>
            <MenuItem value={'published'}>published</MenuItem>
            <MenuItem value={'closed'}>closed</MenuItem>
          </Select>
          <Button variant="contained" component="label" className={styles.button}>
            Upload picture
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleChange(e, 'image')}/>
          </Button>
          <Button type="submit" color="secondary" variant="contained" className={styles.button}>Save</Button>  
        </form>
      </Card>
    </Container>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  updatePost: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  posts: getAll(state),
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

