import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './NotFound.module.scss';
import { settings } from '../../../settings';
import Card from '@material-ui/core/Card';

const Component = ({className, children}) => (
  <Card className={clsx(className, styles.root)}>
    <div className={styles.content}>
      <img src={settings.notFound} alt="404 error" className={styles.image} />
    </div>
    <div className={styles.content}>
      <Button className={styles.button} size="large" href='/' variant="contained">Go to main page</Button>
    </div>
    {children}
  </Card>
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
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
