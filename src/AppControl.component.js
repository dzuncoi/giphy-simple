import React from 'react';
import PropTypes from 'prop-types';
import './styles/app_control.css'

const AppControl = props => {
  return (
    <div className="app-control">
      {
        props.loading ?
        <div className="loading"></div> :
        <button onClick={props.onLoadMore}>
          Load more
        </button>
      }
    </div>
  )
}

AppControl.propTypes = {
  loading: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired
}

AppControl.defaultProps = {
  loading: false,
  onLoadMore: () => true
}

export default AppControl;
