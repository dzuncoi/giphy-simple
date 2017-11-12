import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/item.css';

export default class TrendingItem extends Component {
  onImgClick = () => {
    console.log('click image');
  }

  render() {
    const { item } = this.props;
    const { user = {} } = item;
    const imgSize = {
      width: `${item.images.fixed_height.width}px`,
      height: `${item.images.fixed_height.height}px`,
    }
    const placeholderStyle = {
      paddingBottom: `${item.images.fixed_height.height}px`,
    }
    return (
      <div>
        <div className="img-wrapper">
          <figure className="picture">
            <div className="placeholder" style={placeholderStyle}></div>
            <div className="anim-img" style={imgSize} onClick={this.onImgClick}>
              <img src={item.images.fixed_height.url} alt={item.title} />
            </div>
          </figure>
        </div>
        <div className="author">
          <a href={user.profile_url} target="_blank">
            <img src={user.avatar_url} />
            <h3>{user.username || 'No user'}</h3>
          </a>
        </div>
      </div>
    )
  }
}

TrendingItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.shape({
      fixed_height: PropTypes.object,
    }),
    user: PropTypes.shape({
      profile_url: PropTypes.string,
      avatar_url: PropTypes.string,
      username: PropTypes.string,
    })
  })
}

TrendingItem.defaultProps = {
  item: {
    title: '',
    images: {},
    user: {}
  }
}
