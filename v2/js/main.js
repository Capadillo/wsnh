// --------------------------------------------------
// Options
// --------------------------------------------------

import { update as exterra_update } from './exterra.js';

$('input').on('input change', () => {
    exterra_update();
});

$(() => {
    exterra_update();
})

// --------------------------------------------------
// Widgets
// --------------------------------------------------

import './widgets/spinner.js';
import './widgets/slider.js';

// --------------------------------------------------
// Collapsible
// --------------------------------------------------

import { clipboard } from './utils/clipboard.js';
import { flash } from './utils/flash.js';

$('button[data-button="toggle"]').on('click', function() {
    const article = $(this).parent().next('article');

    article.toggleClass('collapsed');
    
    if (article.hasClass('collapsed')) {
        $(this).text('menu');
    } else {
        $(this).text('menu_open');
    }
});

$('button[data-button="copy"]').on('click', function() {
    const text = $(this).siblings('span').text();
    const article = $(this).parent().next('article');
    clipboard(article.text().replace(/[^\S\r\n]{2,}/g,''));
    flash(`${text} Copied!`);
});