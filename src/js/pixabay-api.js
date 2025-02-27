import axios from 'axios';

export function getImg(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '49069993-51884dcb47f371bf5faecc40d',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
