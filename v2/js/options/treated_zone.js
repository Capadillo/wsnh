import cfg from "./config.json" with { type: "json" }

// ------------------------------------------------------------
// User Input
// ------------------------------------------------------------

function calculate()
{
    // --------------------------------------------------
    // Number of Meters
    // --------------------------------------------------

    const num_trenching = $(`#soil-input`).val();
    const num_rodding   = $(`#concrete-input`).val();

    // --------------------------------------------------
    // Install
    // --------------------------------------------------

    const duration = (num_trenching * cfg.install.trenching.duration
                   + num_rodding * cfg.install.rodding.duration) / 60;

    const labour   = cfg.labour * cfg.install.trenching.multiplier;

    // --------------------------------------------------
    // Results
    // --------------------------------------------------

    const multiplier = Number($(`#multiplier`).val());

    if (num_trenching + num_rodding == 0) {
        return {
            price: 0,
            duration: 0,
            meters: { trenching: num_trenching, rodding: num_rodding }
        }
    }

    return {
        price: labour * duration * multiplier,
        duration: duration,
        meters: { trenching: num_trenching, rodding: num_rodding }
    }
}

export default function() {
    const { price, duration, meters } = calculate();

    $('#trenching-meters').text(meters.trenching);
    $('#rodding-meters').text(meters.rodding);
    $('#treated_zone_price').text(`$${price.toFixed(0)}`);
    $('#treated_zone_duration').text(`${duration}`);
}