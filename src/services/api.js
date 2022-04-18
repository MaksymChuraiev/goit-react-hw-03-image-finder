import axios from 'axios';

const api = async (search, pageAmount) => {
  // const key = '25261319-41493d7d09d351884ef55fa82';
  const URL = 'https://pixabay.com/api/';
  const options = {
    params: {
      key: '25261319-41493d7d09d351884ef55fa82',
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageAmount,
      per_page: 12,
    },
  };
  const responce = await axios.get(URL, options);

  if (responce.data.total === 0) {
    return Promise.reject(new Error('Not found!'));
  }

  return responce;
};

export const getApi = { api };