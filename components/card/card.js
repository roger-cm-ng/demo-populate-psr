import React, { Component } from 'react';
import { connect } from 'react-redux';
import styleable from 'react-styleable';
import PropTypes from 'prop-types';
import Svg from 'react-svg-inline';
import css from './card.scss';

@styleable(css)
class Card extends Component {
  static propTypes= {
    svg: PropTypes.string,
    className: PropTypes.string,
    cardReducer: PropTypes.object
  };

  render() {
    const { svg, className, cardReducer } = this.props;

    return (
      <div className={`${css.card} ${className || ''}`}>
        <Svg svg={cardReducer[svg]} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cardReducer: state.cardReducer
});

export default connect(mapStateToProps)(Card);
