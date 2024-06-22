/**
 * <div class="spinner">
 *     <button>&plus;</button>
 *     <input type="number">
 *     <label>Description</label>
 *     <button>&minus;</button>
 * </div>
 */

$('.spinner button').on('click', function(e) {
    const type = $(this).text();
    
    if (type === '+') {
        $(this).siblings('input')[0].stepUp();
        navigator.vibrate(100);
    } else {
        $(this).siblings('input')[0].stepDown();

        if ($(this).siblings('input').val() === '0') {
            navigator.vibrate([100, 0, 100]);
        } else {
            navigator.vibrate(100);
        }
    }

    $(this).siblings('input').trigger('input');
});