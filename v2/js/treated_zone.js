function r2(v, toNumber = true) {
    return toNumber ? Number(v.toFixed(2)) : v.toFixed(2);
}

// ------------------------------------------------------------
// User Input
// ------------------------------------------------------------

function onUpdate(meters = {}, multiplier = 1) {
    meters.soil || (meters.soil = 0);
    meters.concrete || (meters.concrete = 0);

    let duration = ((meters.soil * 7.5) + (meters.concrete * 15)) / 60;

    // --------------------------------------------------
    // Hard Values
    // --------------------------------------------------

    const rate_per_hour = 242.00 * 2.75;

    // --------------------------------------------------
    // Generated Values
    // --------------------------------------------------

    // Installation / Renewal
    let labour = rate_per_hour * duration;

    // --------------------------------------------------
    // Return Everything
    // --------------------------------------------------

    if (meters.soil + meters.concrete == 0) {
        return { install: 0, duration: 0 };
    }

    if (true) {
        console.clear();
        console.log(rate_per_hour);
        console.log(duration);
        console.log(labour);
    }

    return {
        install: labour * multiplier,
        duration
    };
}

// ------------------------------------------------------------
// Print To Consolec
// ------------------------------------------------------------

export function update() {
    const soil       = $('#soil-input').val();
    const concrete   = $('#concrete-input').val();
    const multiplier = $('#multiplier').val();
    const { install, duration } = onUpdate({ soil, concrete }, multiplier);

    $('#trenching-meters').text(soil);
    $('#rodding-meters').text(concrete);
    $('#treated_zone_price').text(`$${install.toFixed(0)}`);
    $('#treated_zone_duration').text(`${duration}`);
}