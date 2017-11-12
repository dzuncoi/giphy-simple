import React from 'react';
import PropTypes from 'prop-types';
import './styles/app_control.css'

const AppControl = props => {
  return (
    <div className="app-control">
      {
        props.hasError && <p className="txt-error">There are some problems. Please try again later.</p>
      }
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
  loading: PropTypes.bool,
  hasError: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired
}

AppControl.defaultProps = {
  loading: false,
  hasError: false,
  onLoadMore: () => true
}

export default AppControl;
