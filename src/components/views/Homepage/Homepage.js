import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchPublished, getPublished } from '../../../redux/postsRedux.js';
import { Link } from 'react-router-dom';
import { settings, IMAGES_URL } from '../../../settings.js';
import { getUser } from '../../../redux/loginRedux.js';

import styles from './Homepage.module.scss';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.array,
    getPublished: PropTypes.func,
    fetchPublished: PropTypes.func,
    user: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchPublished();
  }
  
  render() {
    const { className,  posts, user} = this.props;
    const login = user.logged;

    return (
      <Container className={clsx(className, styles.root)}>
        {login ?
          <Link to={`/posts/add`} className={styles.linkAdd}>Add new post</Link>
          :null}
        <Grid container spacing={3}>

          {posts.map(el => (
            <Grid item sm={4} xs={12} key={el._id}>
              <Card className={styles.card}>
                <CardActionArea>
                  <Link to={`/posts/${el._id}`} className={styles.linkContent}>
                    <CardMedia component="img" height="150" image={el.photo ? `${IMAGES_URL}/${el.photo}` : settings.image}/>
                    <CardContent>
                      <h5>{el.title}</h5>
                    </CardContent>
                  </Link>
                </CardActionArea>
                <CardActions>
                  <Link to={`/posts/${el._id}`} className={styles.link}>Read more</Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
} 


const mapStateToProps = state => ({
  posts: getPublished(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch, state) => ({
  fetchPublished: () => dispatch(fetchPublished(state)),
});



const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};
