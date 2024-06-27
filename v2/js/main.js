// --------------------------------------------------
// Options
// --------------------------------------------------

import { update as exterra_update } from './exterra.js';
import { update as treated_zone_update } from './treated_zone.js';

$('input').on('input change', () => {
    exterra_update();
    treated_zone_update();
});

$(() => {
    exterra_update();
    treated_zone_update();
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

$('[data-copy]').on('click', function() {
    const copy_id = $(this).data('copy');

    const text = $(`#${copy_id}`).text();
    clipboard(text.replace(/[^\S\r\n]{2,}/g,'').trim());
    flash(`Copied!`);
});

$('[data-collapse]').on('click touch', function() {
    const collapse_id = $(this).data('collapse');
    $(`#${collapse_id}`).toggleClass('collapsed');

    if ($(this).hasClass('material-symbols-outlined')) {
        if ($(this).text().startsWith("menu")) {
            if ($(`#${collapse_id}`).hasClass('collapsed')) {
                $(this).text('menu');
            } else {
                $(this).text('menu_open');
            }
        }
    }
});