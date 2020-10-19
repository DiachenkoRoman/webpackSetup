import moment from 'moment';
import { doSomeStuff } from './modules/common';

import 'normalize.css';
import './assets/admin.sass';

let date = moment( new Date() );
console.log('Admin works', date );

document.addEventListener('DOMContentLoaded', () => {
    
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        doSomeStuff('admin 123');
    });

});