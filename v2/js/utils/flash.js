export function flash(message, selector = '.flash') {
    $(selector).html(message);

    $(selector).fadeIn(function() {
        setTimeout(function() { $(selector).fadeOut(); }, 2500);
    });
}