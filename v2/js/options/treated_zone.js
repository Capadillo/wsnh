import cfg from "./config.json" with { type: "json" }

function calculate()
{
    // --------------------------------------------------
    // Number of Meters
    // --------------------------------------------------

    const num_trenching = $(`#input-soft`).val();
    const num_rodding   = $(`#input-hard`).val();

    // --------------------------------------------------
    // Install
    // --------------------------------------------------

    const duration = (num_trenching * cfg.treated_zone.trenching.duration
                   + num_rodding * cfg.treated_zone.rodding.duration) / 60;

    const labour   = cfg.labour * cfg.treated_zone.trenching.multiplier;

    // --------------------------------------------------
    // Results
    // --------------------------------------------------

    const multiplier = Number($(`#multiplier`).val());

    return {
        price: labour * duration * multiplier,
        duration: duration,
        meters: { trenching: num_trenching, rodding: num_rodding }
    }
}

export default function() {
    const { price, duration, meters } = calculate();
    
    if (meters.trenching + meters.rodding == 0) {
        $('#trenching-meters').text(`0`);
        $('#rodding-meters').text(`0`);
        $('#treated_zone_price').text(`$0`);
        $('#treated_zone_duration').text(`0`);
        return;
    }

    $('#trenching-meters').text(meters.trenching);
    $('#rodding-meters').text(meters.rodding);
    $('#treated_zone_price').text(`$${price.toFixed(0)}`);
    $('#treated_zone_duration').text(`${duration}`);
}