/* global window document */
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReloadCombinedReducers from './reload-combined-reducers';
import Header from '../header/header';
import Login from '../login/login';
import Deck from '../deck/deck';
import ThumbCards from '../thumb-cards/thumb-cards';
import BigCard from '../big-card/big-card';
import { handleDefaults } from '../helpers/utils';
import './core.scss';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class EntryApp {
  constructor(element, dynamicOptions) {
    const defaults = {};
    this.element = element;
    this.options = handleDefaults(defaults, dynamicOptions);
    this.renderElm();
  }

  renderElm() {
    const store = createStoreWithMiddleware(
      ReloadCombinedReducers,
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    ReactDom.render(
      <Provider store={store}>
        <Router>
          <div>
            <Route
              path="/"
              component={Header}
            />
            <Route
              exact
              path="/login"
              component={Login}
            />
            <Route
              exact
              path="/deck"
              component={Deck}
            />
            <Route
              exact
              path="/"
              component={ThumbCards}
            />
            <Route
              path="/big-card"
              component={BigCard}
            />
          </div>
        </Router>
      </Provider>,
      document.querySelector(this.element)
    );
  }
}

window.EntryApp = EntryApp;
