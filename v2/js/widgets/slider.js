function updateOutput(range, output) {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    output.innerHTML = newVal.toFixed(0) + "%";
    output.style.left = (newVal + '%');
    output.style.transform = 'translate(' + (-1 * newVal) + '%, -3rem)';
}

$('.slider input[type=range]').each(function () {
    updateOutput($(this)[0], $(this).siblings('output')[0]);
    $(this).siblings('output').fadeOut(0);
    $(this).trigger('input');
});

$('.slider input[type=range]').on('mousedown touchstart mouseover', function () {
    $(this).siblings('output').fadeIn(100);
});

$('.slider input[type=range]').on('mouseup touchend mouseout', function () {
    $(this).siblings('output').fadeOut();
});

$('.slider input[type=range]').on('input', function () {
    updateOutput($(this)[0], $(this).siblings('output')[0]);
    navigator.vibrate(100);
});