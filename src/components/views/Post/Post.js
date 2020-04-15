import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/loginRedux';
import { getPostById } from '../../../redux/postsRedux.js';
import { settings, IMAGES_URL } from '../../../settings.js';
import { Link } from 'react-router-dom';


import styles from './Post.module.scss';


const Component = ({ className, post, user }) => (
  <Container className={clsx(className, styles.root)}>
    {console.log('post ', post )}
    <Card key={post._id}>
      <div className= {styles.header}>

        <CardHeader title={post.title}/>
        <div className={styles.price}>
          <h4>PRICE</h4>
          <p>${post.price || settings.price}</p>
        </div>
      </div>

      <CardContent className={styles.status}>
        <CardMedia component="img" alt="img" image={post.photo ? `${IMAGES_URL}/${post.photo}` : settings.image} title="img" className={styles.image}/>
        <p>{`published: ${post.created}/ updated: ${post.updated || ''}`}</p>
      </CardContent>
      
      <CardContent className={styles.contentWrapper}>
        <p className={styles.content}>{post.text}</p>
        <div className={styles.contact}>
          <h5>CONTACT</h5>
          <p>location: {post.location} </p>
          <p>phone: {post.phone} </p>
          <p>author: {post.author} </p>
        </div>
        {user.logged && user.mail === post.author ?
          <Link to={`/posts/${post._id}/edit`} className={styles.link}>Edit</Link>
          : null}
      </CardContent>
    </Card>
  </Container>
);

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  user: PropTypes.object,
  fetchPost: PropTypes.func,


  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
});

const PostContainer = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};
