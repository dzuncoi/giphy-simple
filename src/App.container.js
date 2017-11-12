import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { getTrendingItems } from './reducers/trending';
import TrendingItemComponent from './TrendingItem.component';

class AppContainer extends Component {
  componentWillMount() {
    this.props.getTrendingItems();
  }

  render() {
    const { trending } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">GIPHY Trending</h1>
        </header>
        <div className="content">
          <ul className="content-list">
            {
              trending.items.map(item => (
                <li key={item.id}>
                  <TrendingItemComponent item={item} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trending: state.trending
})

const mapDispatchToProps = dispatch => ({
  getTrendingItems: () => dispatch(getTrendingItems()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
