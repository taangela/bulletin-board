import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';


import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import { settings } from '../../../settings.js';
import {Link} from 'react-router-dom';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostList.module.scss';

const Component = ({className, children, posts}) => (
  <Container className={clsx(className, styles.root)}>
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

};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
const PostListContainer = connect(mapStateToProps)(Component);

export {
  //Component as PostList,
  PostListContainer as PostList,
  Component as PostListComponent,
};
