import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import { HeaderContainer } from '../Header/Header';
import {Link} from 'react-router-dom';
import styles from './MainLayout.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar position="static">
      <Toolbar className= {styles.content}>
        <Typography variant="h4" className={styles.title}>
          <Link to={`/`} className={styles.link}>  
            Bulletin Board
          </Link>
        </Typography>
        <HeaderContainer />
      </Toolbar>
    </AppBar>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  //Container as MainLayout,
  Component as MainLayoutComponent,
};
