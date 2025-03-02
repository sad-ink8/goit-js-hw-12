import axios from 'axios';

const loadBtn = document.getElementById('loadbtn');

export async function getImg(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '49069993-51884dcb47f371bf5faecc40d',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });
    loadBtn.style.display = 'block';
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// .then(response => {
//       return response.data;
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
