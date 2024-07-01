// --------------------------------------------------
// Options
// --------------------------------------------------

import exterra from './options/exterra.js';
import treated_zone from './options/treated_zone.js';

function update() {
    exterra()
    treated_zone()
}

$('input').on('input change', update);

$(update)

$(`[data-dialog=settings]`).on('click', function() {
    $(`dialog#settings`)[0].showModal();
});

$(`[data-close=settings]`).on('click', function() {
    $(`dialog#settings`)[0].close();
});

// --------------------------------------------------
// Widgets
// --------------------------------------------------

import './widgets/collapse.js';
import './widgets/copy.js';
import './widgets/spinner.js';
import './widgets/slider.js';