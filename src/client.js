import moment from 'moment';
import { doSomeStuff } from './modules/common';

import 'normalize.css';
import './assets/client.sass';

let date = moment( new Date() );
console.log('Client works', date );

document.addEventListener('DOMContentLoaded', () => {
    
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        doSomeStuff('client 123');
    });

});