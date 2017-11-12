import request from '../api';

const retrieveTrendingItems = (options) => {
  return request.get('/v1/gifs/trending', {
    params: {
      api_key: 'EkTsNImIP00myvuHfG0Xt1KPsnAdhcza',
      offset: options.skip || 0,
      limit: 20,
    }
  })
}

export default retrieveTrendingItems;
