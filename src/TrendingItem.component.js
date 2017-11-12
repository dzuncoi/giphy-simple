import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './styles/item.css';

export default class TrendingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isZoomed: false,
      zoomOffset: {
        top: null,
        left: null
      },
      zoomScale: 1,
    }
  }

  onImgClick = () => {
    if (this.state.isZoomed) {
      return this.setState({
        zoomOffset: { top: null, left: null },
        isZoomed: !this.state.isZoomed,
        zoomScale: 1,
      })
    }
    const wWidth = window.innerWidth,
          wHeight = window.innerHeight;
    const { original } = this.props.item.images;
    const imgRatio = original.width / original.height,
          screenRatio = wWidth / wHeight;
    let scale = 1;
    if (imgRatio > screenRatio) {
      // Calculate by width
      scale = original.width / wWidth > 1 ? (original.width / wWidth) : 1;
    } else {
      // Calculate by height
      scale = original.height / wHeight > 1 ? (original.height / wHeight) : 1;
    }

    const currentPosition = ReactDOM.findDOMNode(this).getBoundingClientRect();
    const newPosition = {
      top: (wHeight - original.height / scale)/2 - 10,
      left: (wWidth - original.width / scale)/2 - 10,
    }
    const offset = {
      top: newPosition.top - currentPosition.top,
      left: newPosition.left - currentPosition.left,
    }
    this.setState({
      zoomOffset: offset,
      isZoomed: !this.state.isZoomed,
      zoomScale: scale
    });
  }

  render() {
    const { isZoomed, zoomOffset, zoomScale } = this.state;
    const { item } = this.props;
    const {
      user = {},
      images
    } = item;
    const currentImage = isZoomed ? images.original : images.fixed_height;
    const mediaStyle = {
      width: `${currentImage.width / zoomScale}px`,
      height: `${currentImage.height / zoomScale}px`,
      top: zoomOffset.top,
      left: zoomOffset.left,
    }
    const placeholderStyle = {
      paddingBottom: `${item.images.fixed_height.height}px`,
    }
    return (
      <div>
        <div className="img-wrapper">
          <figure className={`picture ${isZoomed ? 'is-zoomed' : ''}`} onClick={this.onImgClick}>
            <div className="placeholder" style={placeholderStyle}></div>
            <div className="anim-img" style={mediaStyle}>
              <img src={item.images.fixed_height.url} alt={item.title} className="media-fixed" />
              <img src={item.images.original.url} alt={item.title} className="media-zoom" />
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
      original: PropTypes.object,
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
