import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { getTrendingItems } from './reducers/trending';
import './styles/item.css';

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
                  <div className="img-wrapper">
                    <figure className="picture">
                      <img src={item.images.fixed_height.url} alt={item.title} />
                    </figure>
                  </div>
                  <div className="author">
                    <a href={item.user && item.user.profile_url} target="_blank">
                      <img src={item.user && item.user.avatar_url} />
                      <h3>{item.user && item.user.username || 'No user'}</h3>
                    </a>
                  </div>
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
