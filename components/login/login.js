import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import css from './login.scss';
import {
  authenticate, inputText, acquireUsers, showOneUser, showAllUsers
} from './login-actions';
import Initial from '../initial/initial';

@styleable(css)
class Login extends Component {
  static propTypes = {
    history: PropTypes.object,
    authenticate: PropTypes.func,
    inputText: PropTypes.func,
    loginReducer: PropTypes.object,
    acquireUsers: PropTypes.func,
    usersReducer: PropTypes.array,
    showOneUser: PropTypes.func,
    showAllUsers: PropTypes.func
  };

  pinHandler = (evt, key) => {
    const { loginReducer, history } = this.props;
    this.props.inputText(key, evt.target.value);
    if (evt.target.value.length === 4) {
      this.props.authenticate(loginReducer.creds, history);
    }
  }

  emailHandler = (email) => {
    const { usersReducer } = this.props;
    this.props.showOneUser(email, usersReducer);
    this.props.inputText('email', email);
  }

  showAllUsers = () => {
    const { usersReducer } = this.props;
    this.props.showAllUsers(usersReducer);
    this.props.inputText('email', '');
  }

  componentDidMount() {
    this.props.acquireUsers();
    this.props.inputText('email', '');
  }

  render() {
    const { usersReducer, loginReducer } = this.props;

    return (
      <div className={css.login}>
        <div
          className={`${css['show-all-users']} ${loginReducer.creds.email.length > 0 ? css.show : css.hide}`}
        >
          <div
            role="presentation"
            className={css['show-all-users-btn']}
            onClick={this.showAllUsers}
          >
            ← Show all users
          </div>
        </div>
        <ul
          className={css.shell}
        >
          {
            usersReducer.map((item, ind) => (
              <li
                key={ind}
                role="presentation"
                className={`${css.icon} ${item.show ? css.show : css.hide}`}
                onClick={() => { this.emailHandler(item.email); }}
              >
                <Initial
                  firstName={item.firstName}
                  lastName={item.lastName}
                  color={item.color}
                />
              </li>
            ))
          }
        </ul>
        <input
          className={`${css.pin} ${loginReducer.creds.email.length > 0 ? css.show : css.hide}`}
          placeholder="PIN"
          type="password"
          maxLength="4"
          onChange={(evt) => { this.pinHandler(evt, 'pin'); }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer,
  usersReducer: state.usersReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    authenticate,
    inputText,
    acquireUsers,
    showOneUser,
    showAllUsers
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
