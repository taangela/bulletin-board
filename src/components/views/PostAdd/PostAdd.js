import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
// import { getAll } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({ className, children }) => (
  <Container className={clsx(className, styles.root)}>
    <Card>
      <CardHeader 
        className={styles.header}
        title="Add your own advertisement!"
      />
      <CardContent className={styles.cardContent}>
        <TextField
          required
          id="post-title"
          label="Title"
          placeholder="Write min. 10 characters here"
          className={styles.textField}
        />
        <TextField
          id="post-price"
          label="Price"
          className={styles.textField}
        />
        <TextField
          required
          variant="outlined"
          multiline
          rows="10"
          id="post-content"
          label="Description"
          placeholder="Write min. 20 characters here"
          className={ styles.description}
        />
          
        <div className={styles.contact}>
          <TextField
            required
            id="post-mail"
            label="E-mail"
            className={styles.textField}
          />
          <TextField
            id="post-phone"
            label="Phone number"
            className={styles.textField}
          />
          <FormControl className={styles.formControl}>
            <InputLabel id="post-status">Status</InputLabel>
            <Select
              labelId="post-status-label"
              id="post-status-select"
            >
              <MenuItem value={'draft'}>draft</MenuItem>
              <MenuItem value={'published'}>published</MenuItem>
              <MenuItem value={'closed'}>closed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          variant="contained"
          component="label"
          className={styles.button}
        >
          Upload picture
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Button>
      </CardContent>
    </Card>
    {children}
  </Container>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   posts: getAll(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const PostContainer = connect(mapStateToProps)(Component);

export {
  Component as PostAdd,
  // PostContainer as PostAdd,
  Component as PostAddComponent,
};
