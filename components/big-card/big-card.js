import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
// import localStorage from 'local-storage';
import css from './big-card.scss';
import Card from '../card/card';
// import { vote } from './big-card-actions';

@styleable(css)
class BigCard extends Component {
  static propTypes= {
    bigCardReducer: PropTypes.string,
    history: PropTypes.object,
    identityReducer: PropTypes.object
    // vote: PropTypes.func
  };

  backToThumbCards = () => {
    const { history } = this.props;
    history.push('/');
  }

  componentDidMount() {
    const { bigCardReducer, identityReducer } = this.props;
    const socket = openSocket('#BASE_URL#');
    // this.props.vote({ card: bigCardReducer });
    // const token = localStorage.get('token');
    // if (!token) {
    //   return;
    // }
    socket.emit('vote', {
      card: bigCardReducer,
      identity: identityReducer
    });
  }

  render() {
    const { bigCardReducer } = this.props;

    return (
      <div className={css['big-card']}>
        <div onClick={this.backToThumbCards}>
          <Card className={css.card} svg={bigCardReducer} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bigCardReducer: state.bigCardReducer,
  identityReducer: state.identityReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // vote
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BigCard);
