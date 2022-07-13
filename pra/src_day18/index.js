import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './WeatherApp.js';
import emotionNormalize from 'emotion-normalize';

import './styles.css';

const App = () => {
return (
        <WeatherApp/>
)}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);