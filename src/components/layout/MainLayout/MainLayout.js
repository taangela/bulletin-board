import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




import styles from './MainLayout.module.scss';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';


const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar position="static">
      <Toolbar className= {styles.content}>
        <Typography variant="h4" className={styles.title}>
          <Link to={`/`} className={styles.link}>  
            Bulletin Board
          </Link>
        </Typography>
        <Header />
      </Toolbar>
    </AppBar>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as MainLayout,
  //Container as MainLayout,
  Component as MainLayoutComponent,
};
