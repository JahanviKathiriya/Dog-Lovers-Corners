import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.css"
import Carousel from './component/carousel';
import DogBreeds from './component/breedsList';
import NavbarNav from './component/navbar';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavbarNav />
    <DogBreeds />
    <Carousel />
  </React.StrictMode>
);