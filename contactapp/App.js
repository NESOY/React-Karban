import React from 'react';
import {
    render,
} from 'react-dom';
import ContactApp from './ContactApp';

const contacts = [{
        name: '권영재',
        email: 'cassiozen@gmail.com',
    },
    {
        name: 'Dan Abramov',
        email: 'gaearon@somewhere.com',
    },
    {
        name: 'Pete Hunt',
        email: 'floydophone@somewhere.com',
    },
    {
        name: 'Paul O’Shannessy',
        email: 'zpao@somewhere.com',
    },
    {
        name: 'Ryan Florence',
        email: 'rpflorence@somewhere.com',
    },
    {
        name: 'Sebastian Markbage',
        email: 'sebmarkbage@here.com',
    },
];

render( < ContactApp contacts = {
            contacts
        }
        />, document.getElementById('root'));