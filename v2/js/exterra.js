import { round } from './utils/numbers.js';

// ------------------------------------------------------------
// User Input
// ------------------------------------------------------------

function onUpdate(stations = {}, multiplier = 1) {
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

    if (stations.soil + stations.concrete == 0) {
        return { install: 0, renewal: 0, duration: { install: 0 } };
    }

    return {
        install: (materials_y1 + labour_y1 + monitor) * multiplier,
        renewal: (materials_y2 + labour_y2 + monitor) * multiplier,
        duration
    };
}

// ------------------------------------------------------------
// Print To Consolec
// ------------------------------------------------------------

export function update() {
    const soil = Math.ceil($('#soil-input').val() / 2.75);
    const concrete = Math.ceil($('#concrete-input').val() / 2.75);
    const multiplier = $('#multiplier').val();
    const { install, renewal, duration } = onUpdate({ soil, concrete }, multiplier);

    $('#install_overview').text(`$${install.toFixed(2)}`);
    $('#install').text(`$${install.toFixed(2)}`);
    $('#renewal').text(`$${renewal.toFixed(2)}`);
    $('#stations-soil').text(`${soil}`);
    $('#stations-concrete').text(`${concrete}`);
    $('#duration').text(`${duration.install}`);
}