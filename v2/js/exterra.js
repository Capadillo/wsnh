function r2(v, toNumber = true) {
    return toNumber ? Number(v.toFixed(2)) : v.toFixed(2);
}

// ------------------------------------------------------------
// User Input
// ------------------------------------------------------------

function onUpdate(stations = {}, multiplier = 1) {
    stations.soil || (stations.soil = 0);
    stations.concrete || (stations.concrete = 0);

    let duration = {
        install: r2((45 + ((stations.soil * 15.0) + (stations.concrete * 30.0))) / 60),
        renewal: r2((60 + ((stations.soil *  2.0) + (stations.concrete *  2.0))) / 60),
        monitor: r2((15 + ((stations.soil *  1.5) + (stations.concrete *  1.5))) / 60),
    };

    // --------------------------------------------------
    // Hard Values
    // --------------------------------------------------

    const rate_per_hour = 242.00;

    const num_monitor_visits = 5;

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
    let monitor = (rate_per_hour * duration.monitor) * num_monitor_visits;

    // --------------------------------------------------
    // Return Everything
    // --------------------------------------------------

    if (stations.soil + stations.concrete == 0) {
        return { install: 0, renewal: 0, duration: { install: 0 } };
    }

    if (false) {
        console.clear();
        console.log('\t- Stations -');
        console.log('In-Ground\t\t', stations.soil.toString().padStart(3, ' '));
        console.log('In-Concrete\t\t', stations.concrete.toString().padStart(3, ' '));
        console.log('');
        console.log('\t\t\t- Install -');
        console.log('Materials\t\t\t\t\t$', r2(materials_y1, false).padStart(7, ' '));
        console.log('Labour\t\t', duration.install.toFixed(2).padStart(5, ' '), 'Hrs\t\t$', r2(labour_y1, false).padStart(7, ' '));
        console.log('Monitor\t\t', (duration.monitor * num_monitor_visits).toFixed(2).padStart(5, ' '), 'Hrs\t\t$', r2(monitor, false).padStart(7, ' '));
        console.log('TOTAL\t\t', (duration.install + (duration.monitor * num_monitor_visits)).toFixed(2).padStart(5, ' '),'Hrs\t\t$', r2(labour_y1 + materials_y1 + monitor, false).padStart(7, ' '));
        console.log('');
        console.log('\t\t\t- Renewal -');
        console.log('Materials\t\t\t\t\t$', r2(materials_y2, false).padStart(7, ' '));
        console.log('Labour\t\t', duration.renewal.toFixed(2).padStart(5, ' '), 'Hrs\t\t$', r2(labour_y2, false).padStart(7, ' '));
        console.log('Monitor\t\t', (duration.monitor * num_monitor_visits).toFixed(2).padStart(5, ' '), 'Hrs\t\t$', r2(monitor, false).padStart(7, ' '));
        console.log('TOTAL\t\t', (duration.renewal + (duration.monitor * num_monitor_visits)).toFixed(2).padStart(5, ' '),'Hrs\t\t$', r2(labour_y2 + materials_y2 + monitor, false).padStart(7, ' '));
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

    $('#install_overview').text(`$${install.toFixed(0)}`);
    $('#install').text(`$${install.toFixed(0)}`);
    $('#renewal').text(`$${renewal.toFixed(0)}`);
    $('#stations-soil').text(`${soil}`);
    $('#stations-concrete').text(`${concrete}`);
    $('#duration').text(`${duration.install}`);
}