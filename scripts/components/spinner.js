$(function() {
    // create the spinner buttons
    $("[data-custom-input=spinner]").each((i, e) => {
        $(e).prepend("<button>+</button>");
        $(e).append("<button>-</button>");
    });

    // add the step up/down functionality
    $("[data-custom-input=spinner] button").on('click', (e) => {
        let input = $(e.target).siblings('input')[0];

        if ($(e.target).html() === "+") {
            input.stepUp();
        }

        if ($(e.target).html() === "-") {
            input.stepDown();
        }

        $(input).trigger('change');
    });
});