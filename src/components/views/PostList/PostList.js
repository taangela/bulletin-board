import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from './PostList.module.scss';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

//import {connect} from 'react-redux';
//import {reduxSelector, reduxActionCreator} from '../../../redux/example.js';

const Component = ({ className, posts }) => {
  return (
    <div className={clsx(className, styles.root)}>
      <div component={Paper} className={styles.container}>
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
            {posts.map(el =>
              el.author === 'John Doe' ? (
                <TableRow key={el.id} hover>
                  <TableCell component='th' scope='row'>
                    {el.title}
                  </TableCell>
                  <TableCell align='right'>{el.date}</TableCell>
                  <TableCell align='right'>{el.updateDate}</TableCell>
                  <TableCell align='right'>{el.status}</TableCell>
                  <TableCell align='right'>
                    <Button href={`/post/${el.id}`}>View</Button>
                  </TableCell>
                  <TableCell align='right'>
                    <Button href={`/post/${el.id}/edit`}>Edit</Button>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,

};

const mapStateToProps = state => ({
  posts: getAll(state),
});


// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg),)
// });
const PostListContainer = connect(mapStateToProps)(Component);

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostList,
  PostListContainer as PostList,
  Component as PostListComponent,
};