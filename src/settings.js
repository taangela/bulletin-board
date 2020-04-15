/*export const api = {
  url: '//' + window.location.hostname + (window.location.hostname === 'localhost' ? ':3000/api' : ''),
  posts: 'posts',
};*/
export const API_URL = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:8000/api';


export const IMAGES_URL = (process.env.NODE_ENV === 'production') ? '/uploads' : 'http://localhost:8000/uploads';


export const settings = {
  image: 'https://i.ibb.co/x863rML/black-and-white-blank-challenge-connect-262488-1.jpg',
  price: '0',
  notFound: 'https://colorlib.com/wp/wp-content/uploads/sites/2/46503106_258183111532512_5215616088770871296_n-1.jpg',
}; 

