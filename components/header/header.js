import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import css from './header.scss';
import { verifyUser } from './header-actions';
import Initial from '../initial/initial';

@styleable(css)
class Header extends Component {
  static propTypes = {
    history: PropTypes.object,
    verifyUser: PropTypes.func,
    identityReducer: PropTypes.object
  };

  componentDidMount() {
    this.props.verifyUser();
  }

  render() {
    const { history, identityReducer } = this.props;
    return (
      <div className={css.header}>
        <ul className={css.shell}>
          <li
            className={css.nav}
            role="presentation"
            onClick={() => { history.push('/'); }}
          >
            CARDS
          </li>
          <li
            className={css.nav}
            role="presentation"
            onClick={() => { history.push('/deck'); }}
          >
            DECK
          </li>
          {
            identityReducer.email ? (
              <Initial
                firstName={identityReducer.firstName}
                lastName={identityReducer.lastName}
                color={identityReducer.color}
                className={css.initial}
              />
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
    );
  }
}

const mapStateToProps = state => ({
  identityReducer: state.identityReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    verifyUser
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
