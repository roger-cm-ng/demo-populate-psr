import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import css from './login.scss';
import { authenticate, inputValidateText } from './login-actions';

@styleable(css)
class Login extends Component {
  static propTypes = {
    history: PropTypes.object,
    authenticate: PropTypes.func,
    inputValidateText: PropTypes.func,
    loginReducer: PropTypes.object
  };

  textHandler = (evt, key) => {
    this.props.inputValidateText(key, evt.target.value);
  }

  loginHandler = () => {
    const { loginReducer, history } = this.props;
    this.props.authenticate(loginReducer.creds, history);
  }

  render() {
    const { loginReducer } = this.props;

    return (
      <div className={css.deck}>
        <input
          type="text"
          onChange={(evt) => { this.textHandler(evt, 'email'); }}
        />
        <input
          type="password"
          onChange={(evt) => { this.textHandler(evt, 'password'); }}
        />
        <button
          disabled={!loginReducer.isValid}
          type="submit"
          onClick={this.loginHandler}
        >
          Login
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    authenticate,
    inputValidateText
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
