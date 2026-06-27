import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Import critical images for preloading
import backgroundPath from './assets/images/background.webp';
import museumPath from './assets/images/museum.webp';
import leftTreePath from './assets/images/left_tree.webp';
import rightTreePath from './assets/images/right_tree.webp';
import characterPath from './assets/images/charachter.webp';
import boardTitlePath from './assets/images/board_title_top.webp';
import buttonPlayPath from './assets/images/button_play.webp';
import fanPath from './assets/images/fan.webp';
import secondLeftTreePath from './assets/images/second_left-tree.webp';
import secondRightTreePath from './assets/images/second_right-tree.webp';
import centerTreePath from './assets/images/center_tree.webp';
import chairsPath from './assets/images/chairs.webp';
import lightParkPath from './assets/images/light_park.webp';

// Preload function to instruct browser to download images immediately
const preloadImages = () => {
  const images = [
    backgroundPath,
    museumPath,
    leftTreePath,
    rightTreePath,
    characterPath,
    boardTitlePath,
    buttonPlayPath,
    fanPath,
    secondLeftTreePath,
    secondRightTreePath,
    centerTreePath,
    chairsPath,
    lightParkPath
  ];
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

preloadImages();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
