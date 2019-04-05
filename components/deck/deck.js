import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
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
    this.props.acquireEstimations();
  }

  render() {
    const { deckReducer } = this.props;
    return (
      <div className={css.deck}>
        {
          deckReducer.map((item, ind) => (
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
          ))
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
