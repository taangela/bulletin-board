import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';

import { settings } from '../../../settings';

import styles from './NotFound.module.scss';


const Component = ({className}) => (
  <Card className={clsx(className, styles.root)}>
    <div className={styles.content}>
      <img src={settings.notFound} alt="404 error" className={styles.image} />
    </div>
    <div className={styles.content}>
      <Button className={styles.button} size="large" href='/' variant="contained">Go to main page</Button>
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
