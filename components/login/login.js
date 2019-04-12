import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Select from 'react-dropdown-select';
import localStorage from 'local-storage';
import css from './login.scss';
import { inputIdentity, acquireDecks } from './login-actions';
import { toggleLogin } from '../header/header-actions';
import Socket from '../helpers/socket';

@styleable(css)
class Login extends Component {
  static propTypes = {
    inputIdentity: PropTypes.func,
    acquireDecks: PropTypes.func,
    toggleLogin: PropTypes.func,
    identityReducer: PropTypes.object,
    dropdownReducer: PropTypes.array,
    bigCardReducer: PropTypes.string
  };

  inputHandler = (key, val) => {
    this.props.inputIdentity(key, val);
  }

  selectHandler = (key, val) => {
    this.props.inputIdentity(key, val.length > 0 ? val[0].name : '');
  }

  join = () => {
    const { bigCardReducer, identityReducer } = this.props;
    this.props.toggleLogin(true);

    Socket.emit('join-deck', identityReducer.deck);

    Socket.on('deck-joined', () => {
      Socket.emit('vote', {
        card: bigCardReducer,
        identity: identityReducer
      });
    });

    localStorage.set('identity', identityReducer);
  }

  componentDidMount() {
    this.props.acquireDecks();
  }

  render() {
    const { identityReducer, dropdownReducer } = this.props;
    return (
      <div className={css.login}>
        <input
          className={css.initial}
          placeholder="Initial"
          type="text"
          maxLength="2"
          onChange={(evt) => { this.inputHandler('initial', evt.target.value); }}
        />

        <Select
          searchable
          create
          clearable
          className={`select ${identityReducer.initial.length > 0 ? css.show : css.hide}`}
          labelField="name"
          valueField="name"
          options={dropdownReducer}
          onChange={(val) => { this.selectHandler('deck', val); }}
          placeholder="Deck"
          values={dropdownReducer}
        />

        <div
          role="presentation"
          onClick={this.join}
          className={`${css.join} ${identityReducer.initial.length > 0 && identityReducer.deck.length ? css.show : css.hide}`}
        >
          Join
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  identityReducer: state.identityReducer,
  dropdownReducer: state.dropdownReducer,
  bigCardReducer: state.bigCardReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    inputIdentity,
    acquireDecks,
    toggleLogin
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
