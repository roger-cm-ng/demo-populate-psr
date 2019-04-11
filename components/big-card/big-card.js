import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import css from './big-card.scss';
import Card from '../card/card';
import Socket from '../helpers/socket';

@styleable(css)
class BigCard extends Component {
  static propTypes= {
    bigCardReducer: PropTypes.string,
    history: PropTypes.object,
    identityReducer: PropTypes.object
  };

  backToThumbCards = () => {
    const { history } = this.props;
    history.push('/');
  }

  componentDidMount() {
    const { bigCardReducer, identityReducer } = this.props;
    Socket.emit('vote', {
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

export default connect(mapStateToProps, null)(BigCard);
