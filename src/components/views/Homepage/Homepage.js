import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


import clsx from 'clsx';
import styles from './Homepage.module.scss';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import {getLogStatus} from '../../../redux/loginRedux.js';
import { settings } from '../../../settings.js';
import {Link} from 'react-router-dom';

//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({className, children, posts, login}) => (
  <Container className={clsx(className, styles.root)}>
    {login ?
      <Button
        variant='contained'
        href='/post/add'
        className={styles.button}
      >
        Add new post
      </Button> : null}
    <Grid container spacing={3}>
      {posts.map(el => (
        <Grid item sm={4} xs={12} key={el.id} >
          <Card className={styles.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={el.image || settings.image}
              />
              <CardContent>
                <h5>{el.title}</h5>
                <p>{el.content}</p>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={`/post/${el.id}`} className={styles.link}>
                Read more
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}

      {children}
    </Grid>
  </Container>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  login: PropTypes.bool,


};

const mapStateToProps = state => ({
  posts: getAll(state),
  login: getLogStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const HomepageContainer = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};
