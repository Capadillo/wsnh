import { update as exterra_update } from './exterra.js';

function update() {
    exterra_update();
}

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

    update();
});

$('input').on('input change', () => {
    update();
});

$(() => {
    update();
})

$('[type=range]').each(function () {
    setBubble($(this)[0], $(this).siblings('output')[0]);
    $(this).siblings('output').fadeOut(0);
});

$('[type=range]').on('focus touchstart', function () {
    $(this).siblings('output').fadeIn(100);
});

$('[type=range]').on('blur touchend', function () {
    $(this).siblings('output').fadeOut();
});

$('[type=range]').on('input', function () {
    setBubble($(this)[0], $(this).siblings('output')[0]);
    navigator.vibrate(100);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = newVal.toFixed(0) + "%";

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${24 - newVal * 0.425}px))`;
}

