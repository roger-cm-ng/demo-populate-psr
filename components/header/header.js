import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import css from './header.scss';
import { verifyUser } from './header-actions';

@styleable(css)
class Header extends Component {
  static propTypes = {
    history: PropTypes.object,
    verifyUser: PropTypes.func
  };

  componentDidMount() {
    this.props.verifyUser();
  }

  render() {
    const { history } = this.props;
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
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (/* state  */) => ({});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    verifyUser
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
