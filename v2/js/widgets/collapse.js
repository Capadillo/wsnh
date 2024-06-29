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