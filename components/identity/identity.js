import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
import css from './identity.scss';

@styleable(css)
class Identity extends Component {
  // static propTypes = {
  //   history: PropTypes.object
  // };

  render() {
    // const { history } = this.props;
    return (
      <div className={css.identity}>
        <h1>Identity</h1>
      </div>
    );
  }
}

const mapStateToProps = (/* state  */) => ({});

const mapDispatchToProps = dispatch => bindActionCreators(
  {},
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Identity);
