export const GET_TRENDING_REQUEST = 'trending/GET_TRENDING_REQUEST'
export const GET_TRENDING_SUCCESS = 'trending/GET_TRENDING_SUCCESS'
export const GET_TRENDING_FAILURE = 'trending/GET_TRENDING_FAILURE'

const initialState = {
  items: [],
  total: 0,
  loading: false,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_TRENDING_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case GET_TRENDING_SUCCESS: {
      return {
        ...state,
        loading: false,
        items: state.items.concat(action.items),
        total: state.total + action.items.length,
      }
    }

    case GET_TRENDING_FAILURE: {
      return {
        ...state,
        loading: false,
      }
    }

    default: return initialState;
  }
}

export const getTrendingItems = () => dispatch => {
  dispatch({ type: GET_TRENDING_REQUEST });

  // getTrendingItems().then(data => {
  //   dispatch({ type: GET_TRENDING_SUCCESS, items: data });
  // }).catch(err => {
  //   dispatch({ type: GET_TRENDING_FAILURE });
  // })
}