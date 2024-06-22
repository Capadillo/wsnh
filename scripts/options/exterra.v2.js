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

    display();
});

$(() => {
    display();
})

// --------------------------------------------------
// Utility Functions
// --------------------------------------------------

function round2(number) {
   return +(Math.round(number + "e+2") + "e-2");
}

function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

// --------------------------------------------------
// User Input
// --------------------------------------------------

function onUpdate(stations = {}) {
    stations.soil || (stations.soil = 0);
    stations.concrete || (stations.concrete = 0);

    let duration = {
        install: round(stations.soil * (20 / 60) + stations.concrete * (30 / 60), 0.25),
        renewal: 1 + round((stations.soil + stations.concrete) * (3.5 / 60)),
        monitor: round((stations.soil + stations.concrete) * (2.5 / 60)),
    };

    // --------------------------------------------------
    // Hard Values
    // --------------------------------------------------

    const rate_per_hour = 220;

    const cost = {
        install: {
            soil: 8.29 + 0.20,
            concrete: 15.00 + (0.40 * 4) + 0.20,
        },
        renewal: {
            soil: (0.40 * 6) + 0.20,
            concrete: (0.40 * 4) + 0.20,
        },
    };

    // --------------------------------------------------
    // Generated Values
    // --------------------------------------------------

    // Materials
    let materials_y1 = stations.soil * cost.install.soil + stations.concrete * cost.install.concrete;
    let materials_y2 = stations.soil * cost.renewal.soil + stations.concrete * cost.renewal.concrete;

    // Installation / Renewal
    let labour_y1 = rate_per_hour * duration.install;
    let labour_y2 = rate_per_hour * duration.renewal;

    // Monitoring
    let monitor = (rate_per_hour * duration.monitor) * 5;

    // --------------------------------------------------
    // Return Everything
    // --------------------------------------------------

    return {
        install: materials_y1 + labour_y1 + monitor,
        renewal: materials_y2 + labour_y2 + monitor
    };
}

// --------------------------------------------------
// Print To Consolec
// --------------------------------------------------

function display() {
    const { install, renewal } = onUpdate({
        soil: Math.ceil($('#soil-input').val() / 2.75),
        concrete: Math.ceil($('#concrete-input').val() / 2.75),
    });

    $('ins#install').text(`$${install.toFixed(2)}`);
    $('ins#renewal').text(`$${renewal.toFixed(2)}`);
}