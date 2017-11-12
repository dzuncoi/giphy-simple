import retrieveTrendingItems from '../api/trending';

export const GET_TRENDING_REQUEST = 'trending/GET_TRENDING_REQUEST'
export const GET_TRENDING_SUCCESS = 'trending/GET_TRENDING_SUCCESS'
export const GET_TRENDING_FAILURE = 'trending/GET_TRENDING_FAILURE'

const initialState = {
  items: [],
  total: 0,
  loading: false,
  errorInfo: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_TRENDING_REQUEST: {
      return {
        ...state,
        loading: true,
        errorInfo: null,
      }
    }

    case GET_TRENDING_SUCCESS: {
      return {
        ...state,
        loading: false,
        items: state.items.concat(action.items),
        total: state.total + action.items.length,
        errorInfo: null,
      }
    }

    case GET_TRENDING_FAILURE: {
      return {
        ...state,
        loading: false,
        errorInfo: action.error
      }
    }

    default: return initialState;
  }
}

export const getTrendingItems = () => (dispatch, getState) => {
  dispatch({ type: GET_TRENDING_REQUEST });

  retrieveTrendingItems({ skip: getState().trending.total })
  .then(({ data }) => {
    dispatch({
      type: GET_TRENDING_SUCCESS,
      items: data.data
    })
  }).catch(error => {
    dispatch({
      type: GET_TRENDING_FAILURE,
      error,
    })
  })
}