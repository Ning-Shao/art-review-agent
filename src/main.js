import './styles/index.css';
import { createApp } from './app.js';
import { DOM_IDS } from './ids.js';

createApp(document.querySelector('#' + DOM_IDS.app));
