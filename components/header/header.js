import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import css from './header.scss';
import Initial from '../initial/initial';
import Login from '../login/login';
import { toggleLogin } from './header-actions';

@styleable(css)
class Header extends Component {
  static propTypes = {
    history: PropTypes.object,
    identityReducer: PropTypes.object,
    headerReducer: PropTypes.object,
    toggleLogin: PropTypes.func
  };

  render() {
    const { history, identityReducer, headerReducer } = this.props;
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
              identityReducer.initial.length > 0 ? (
                <li
                  className={css['initial-btn']}
                  role="presentation"
                  onClick={() => { this.props.toggleLogin(headerReducer.login); }}
                >
                  <Initial
                    initial={identityReducer.initial}
                    color={identityReducer.color}
                    className={css['initial-icon']}
                  />
                </li>
              ) : (
                <li
                  className={css.nav}
                  role="presentation"
                  onClick={() => { this.props.toggleLogin(headerReducer.login); }}
                >
                  LOGIN
                </li>
              )
            }
          </ul>
        </div>
        <div
          className={headerReducer.login ? css.show : css.hide}
        >
          <Login />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  identityReducer: state.identityReducer,
  headerReducer: state.headerReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    toggleLogin
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
