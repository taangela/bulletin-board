import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, loginSwitch } from '../../../redux/loginRedux.js';

class Component extends React.Component {
  checkStatus( loginSwitch, user) {
    if (!user) {
      return (
        <Button variant="contained" className={clsx(styles.root, styles.button)}>
          <a href="https://google.com">Login</a>
        </Button>
      );
    } else {
      return (
        <div className={clsx(styles.root)}>
          <Link to={`/list/`} className={clsx(styles.link)}>
            My post
          </Link>
          <Button variant='contained' color='secondary' className={clsx(styles.button)} onClick={loginSwitch}>
            LogOut
          </Button>
        </div>
      );
    }
  }

  render() {
    const { loginSwitch, user} = this.props;
    const login = user.logged;

    return (
      <div className={clsx(styles.root)}>
        <Switch onChange={loginSwitch} 
          checked={login}
          inputProps={{ 'aria-label': 'primary checkbox' }}/>
        {this.checkStatus(loginSwitch, login)}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  loginSwitch: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  loginSwitch: () => dispatch(loginSwitch()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Header,
  Container as HeaderContainer,
  Component as HeaderComponent,
};
