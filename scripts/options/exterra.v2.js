$('.spinner button').on('click', function(e) {
    const type = $(this).text();
    
    if (type === '+') {
        $(this).siblings('input')[0].stepUp();
    } else {
        $(this).siblings('input')[0].stepDown();
    }

    navigator.vibrate(500);

    $(this).siblings('input').trigger('input');
});

// --------------------------------------------------
// Utility Functions
// --------------------------------------------------

function round2(number){
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

const stations = {
    soil: 22,
    concrete: 2,
};

const duration = {
    install: round(stations.soil * (20 / 60) + stations.concrete * (30 / 60), 0.25),
    renewal: 1 + round((stations.soil + stations.concrete) * (2.5 / 60)),
    monitor: 1.25,
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
// Print To Consolec
// --------------------------------------------------

console.log('Year One');
console.log('Duration:', duration.install);
console.log('Materials:', round2(materials_y1));
console.log('Initial:', round2(labour_y1));
console.log('Monitoring:', round2(monitor));
console.log('TOTAL:', round2(materials_y1 + labour_y1 + monitor));
console.log('');
console.log('Year Two');
console.log('Materials:', round2(materials_y2));
console.log('Initial:', round2(labour_y2));
console.log('Monitoring:', round2(monitor));
console.log('TOTAL:', round2(materials_y2 + labour_y2 + monitor));