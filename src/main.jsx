import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Import critical images for preloading
import backgroundPath from './assets/images/background.png';
import museumPath from './assets/images/museum.png';
import leftTreePath from './assets/images/left_tree.png';
import rightTreePath from './assets/images/right_tree.png';
import characterPath from './assets/images/charachter.png';
import boardTitlePath from './assets/images/board_title_top.png';
import buttonPlayPath from './assets/images/button_play.png';
import fanPath from './assets/images/fan.png';

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
    fanPath
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
