import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import css from './login.scss';
import { inputText } from './login-actions';

@styleable(css)
class Login extends Component {
  static propTypes = {
    history: PropTypes.object,
    inputText: PropTypes.func
  };

  fullNameHandler = (evt, key) => {
    this.props.inputText(key, evt.target.value);
  }

  submit = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className={css.login}>
        <input
          className={css['full-name']}
          placeholder="Full name"
          type="text"
          onChange={(evt) => { this.fullNameHandler(evt, 'fullName'); }}
        />
        <div
          role="presentation"
          onClick={this.submit}
          className={css.submit}
        >
          Submit
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  identityReducer: state.loginReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    inputText
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
