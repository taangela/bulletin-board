import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { settings } from '../../../settings';

import styles from './NotFound.module.scss';


const Component = ({className}) => (
  <Card className={clsx(className, styles.root)}>
    <div className={styles.content}>
      <img src={settings.notFound} alt="404 error" className={styles.image} />
    </div>
    <div className={styles.content}>
      <Link to={`/`} className={styles.link}>Go to main page</Link>
    </div>
  </Card>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
