import { clipboard } from '../utils/clipboard.js';
import { flash } from '../utils/flash.js';

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