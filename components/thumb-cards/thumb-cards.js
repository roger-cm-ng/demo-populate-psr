import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import css from './thumb-cards.scss';
import Card from '../card/card';
import { chooseCard } from '../big-card/big-card-actions';
import Socket from '../helpers/socket';

@styleable(css)
class ThumbCards extends Component {
  static propTypes= {
    cardReducer: PropTypes.object,
    chooseCard: PropTypes.func,
    history: PropTypes.object,
    identityReducer: PropTypes.object
  };

  constructor(props) {
    super(props);
    const { cardReducer } = props;
    this.cardsArr = _.map(cardReducer, (val, key) => key);
  }

  clickCard = (item) => {
    const { history } = this.props;
    this.props.chooseCard(item);
    history.push('/big-card');
  }

  componentDidMount() {
    const { identityReducer } = this.props;
    if (identityReducer.initial.length === 0 || identityReducer.deck.length === 0) {
      return;
    }

    Socket.emit('vote', {
      card: null,
      identity: identityReducer
    });
  }

  render() {
    return (
      <div className={css['thumb-cards']}>
        {
          this.cardsArr.map((item, ind) => (
            <div key={ind} onClick={() => this.clickCard(item)}>
              <Card className={css.thumb} svg={item} />
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cardReducer: state.cardReducer,
  identityReducer: state.identityReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
  chooseCard
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ThumbCards);
