import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/loginRedux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './PostList.module.scss';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.array,
    loadPosts: PropTypes.func,
    user: PropTypes.object,
  }

  render() {
    const { className, posts, user } = this.props;
    if (user.logged) {
      return (
        <Container className={clsx(className, styles.root)}>
          <Card className={styles.container}>
            <Link to={`/post/add`} className={styles.link}>Add new post</Link>
            <div className ={styles.tableBody}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>TITLE</TableCell>
                    <TableCell align='right'>Publish Date</TableCell>
                    <TableCell align='right'>Eddition Date</TableCell>
                    <TableCell align='right'>Status</TableCell>
                    <TableCell align='right'></TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.filter(el => el.userId === user.id).map(el => (
                    <TableRow key={el.id} hover>
                      <TableCell component='th' scope='row'>{el.title}</TableCell>
                      <TableCell align='right'>{el.date}</TableCell>
                      <TableCell align='right'>{el.updateDate}</TableCell>
                      <TableCell align='right'>{el.status}</TableCell>
                      <TableCell align='right'>
                        <Link to={`/post/${el.id}`} className={styles.tableLink}>View</Link>
                      </TableCell>
                      <TableCell align='right'>
                        <Link to={`/post/${el.id}/edit`} className={styles.tableLink}>Edit</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </Container>
      );
    } else {  
      return (
        <Container className={clsx(className, styles.root)}>
          <Card className={styles.container}>
            <h3>Login to see your post!</h3>
          </Card>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
});

const PostListContainer = connect(mapStateToProps)(Component);

export {
  //Component as PostList,
  PostListContainer as PostList,
  Component as PostListComponent,
};
