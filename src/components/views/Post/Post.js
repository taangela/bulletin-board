import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/loginRedux';
import { settings } from '../../../settings.js';
import { Link } from 'react-router-dom';


import styles from './Post.module.scss';

const Component = ({ className, match, posts, user }) => (
  <Container className={clsx(className, styles.root)}>
    {posts.filter(el => el.id === match.params.id).map(el => (
      <Card key={el.id}>
        <div className= {styles.header}>
          <CardHeader title={el.title}/>
          <div className={styles.price}>
            <h4>PRICE</h4>
            <p>${el.price || settings.price}</p>
          </div>
        </div>

        <CardContent className={styles.status}>
          <CardMedia component="img" alt="img" image={el.image || settings.image} title="img" className={styles.image}/>
          <p>{`published: ${el.date}/ updated: ${el.updateDate || ''}`}</p>
        </CardContent>
        
        <CardContent className={styles.contentWrapper}>
          <p className={styles.content}>{el.content}</p>
          <div className={styles.contact}>
            <h5>CONTACT</h5>
            <p>location: {el.location} </p>
            <p>phone: {el.phone} </p>
            <p>mail: {el.mail} </p>
            <p>author: {el.author} </p>
          </div>
          {user.logged && user.id === el.userId ?
            <Link to={`/post/${el.id}/edit`} className={styles.link}>Edit</Link>
            : null}
        </CardContent>
      </Card>
    ))}
  </Container>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  user: PropTypes.object,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
});

const PostContainer = connect(mapStateToProps)(Component);

export {
  //Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};
