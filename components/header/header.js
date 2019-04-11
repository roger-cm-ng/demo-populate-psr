import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import css from './header.scss';
import Initial from '../initial/initial';
import Login from '../login/login';

@styleable(css)
class Header extends Component {
  static propTypes = {
    history: PropTypes.object,
    identityReducer: PropTypes.object
  };

  render() {
    const { history, identityReducer } = this.props;
    return (
      <div className={css.header}>
        <div className={css['top-bar']}>
          <div className={css.logo}>SCRUMMiE</div>
          <div className={css.separator} />
          <ul className={css.shell}>
            <li
              className={css.nav}
              role="presentation"
              onClick={() => { history.push('/'); }}
            >
              HOME
            </li>

            <li
              className={css.nav}
              role="presentation"
              onClick={() => { history.push('/deck'); }}
            >
              DECK
            </li>

            {
              identityReducer.fullName.length > 0 ? (
                <li
                  className={css['initial-btn']}
                  role="presentation"
                  onClick={() => { history.push('/login'); }}
                >
                  <Initial
                    firstName={identityReducer.firstName}
                    lastName={identityReducer.lastName}
                    color={identityReducer.color}
                    className={css['initial-icon']}
                  />
                </li>
              ) : (
                <li
                  className={css.nav}
                  role="presentation"
                  onClick={() => { history.push('/login'); }}
                >
                  LOGIN
                </li>
              )
            }
          </ul>
        </div>
        <Login />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  identityReducer: state.identityReducer
});

export default connect(mapStateToProps, null)(Header);
