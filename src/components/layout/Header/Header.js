import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import styles from './Header.module.scss';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, loginSwitch, logOut } from '../../../redux/loginRedux.js';

class Component extends React.Component {
  checkStatus( logOut, user) {
    if (!user) {
      return (
        <Button variant="contained" className={clsx(styles.root, styles.button)}>
          <a href="/auth/google">Login with Google</a>
        </Button>
      );
    } else {
      return (
        <div className={clsx(styles.root)}>
          <Link to={`/list/`} className={clsx(styles.link)}>
            My post
          </Link>
          <Button variant='contained' color='secondary' className={clsx(styles.button)} onClick={logOut}>
            LogOut
          </Button>
        </div>
      );
    }
  }

  render() {
    const { loginSwitch, user, logOut} = this.props;
    const login = user.logged;

    return (
      <div className={clsx(styles.root)}>
        <Switch onChange={loginSwitch} 
          checked={login}
          inputProps={{ 'aria-label': 'primary checkbox' }}/>
        {this.checkStatus(logOut, login)}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  loginSwitch: PropTypes.func,
  logOut: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  loginSwitch: () => dispatch(loginSwitch()),
  logOut: () => dispatch(logOut()),

});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Header,
  Container as HeaderContainer,
  Component as HeaderComponent,
};
