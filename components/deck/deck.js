import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import css from './deck.scss';
import { acquireEstimations } from './deck-actions';
import Card from '../card/card';
import Initial from '../initial/initial';

@styleable(css)
class Deck extends Component {
  static propTypes = {
    acquireEstimations: PropTypes.func,
    deckReducer: PropTypes.array
  };

  componentDidMount() {
    const socket = openSocket('#BASE_URL#');
    socket.on('message', (payload) => {
      this.props.acquireEstimations(payload);
    });
  }

  renderUser = (item, ind) => {
    let elm = <div key={ind} />;
    if (item.card) {
      elm = (
        <div key={ind}>
          <Card
            className={css.thumb}
            svg={item.card}
          />
          <Initial
            firstName={item.firstName}
            lastName={item.lastName}
            color={item.color}
            className={css.initial}
          />
        </div>
      );
    }

    return elm;
  }

  render() {
    const { deckReducer } = this.props;
    return (
      <div className={css.deck}>
        {
          deckReducer.map((item, ind) => this.renderUser(item, ind))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  deckReducer: state.deckReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    acquireEstimations
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
