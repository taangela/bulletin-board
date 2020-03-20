import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom';




import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';
import { defaultSettings } from '../../../settings.js';


//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Homepage.module.scss';



const Component = ({className, children, posts}) => (
  <Container>
    <div className={clsx(className, styles.root)}>
      {posts.map(el => (
        <Card key={el.id} className={styles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image={el.image || defaultSettings.defaultImage}
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
      ))}

      {children}
    
    </div>
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
const HomepageContainer = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};
