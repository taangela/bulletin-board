import React from 'react';
import PropTypes from 'prop-types';

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
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

  }

  state = {
    status: '',
  };

  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  getId() {
    let postId = '';
    if (!this.props.match) {
      return 2;
    } else postId = this.props.match.params.id;
    return postId;
  }

  render() {
    const id = this.getId();
    const {posts} = this.props;
    let editNote = '';
    if(posts){
      posts.map(note => {
        if(note.id === id)
          editNote = note;
      });
    }

    return( 
      <Container className= {styles.root}>

        <Card>
          <CardHeader 
            className={styles.header}
            title="Edit advertisement!"
          />
          <CardContent className={styles.cardContent}>
            <TextField
              required
              id="post-title"
              label="Title"
              minLength="10"
              placeholder="Write min. 10 characters here"
              className={styles.titleField}
              defaultValue={editNote.title}

            />
            <TextField
              id="post-price"
              label="Price"
              className={styles.textField}
              defaultValue={editNote.price}
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
              className={ styles.description}
              defaultValue={editNote.content}
            />
                
            <Grid container spacing={2} className={styles.contact}>
              <Grid item sm={4} xs={12}>
                <TextField
                  required
                  id="author"
                  label="author"
                  className={styles.textField}
                  defaultValue={editNote.author}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <TextField
                  required
                  id="post-mail"
                  label="E-mail"
                  className={styles.textField}
                  defaultValue={editNote.mail}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <TextField
                  id="post-phone"
                  label="Phone number"
                  className={styles.textField}
                  defaultValue={editNote.phone}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
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
              </Grid>
            </Grid>

            <div>
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
            </div>

            <div>
              <Button
                variant="contained"
                className={styles.button}
              >
                save changes
                <input
                  style={{ display: 'none' }}
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.object,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const PostEditContainer = connect(mapStateToProps)(Component);


export {
  ///Component as PostEdit,
  PostEditContainer as PostEdit,
  Component as PostEditComponent,
};

