import cfg from "./config.json" with { type: "json" }

function calculate()
{
    // --------------------------------------------------
    // Number of Stations
    // --------------------------------------------------

    const num_in_ground   = Math.ceil($(`#soil-input`).val()     / cfg.install.inground.distance);
    const num_in_concrete = Math.ceil($(`#concrete-input`).val() / cfg.install.inconcrete.distance);

    // --------------------------------------------------
    // Install
    // --------------------------------------------------

    const duration_y1  = (num_in_ground  * cfg.install.inground.duration
                       +  num_in_concrete * cfg.install.inconcrete.duration)
                       / 60;
    const materials_y1 = num_in_ground   * cfg.install.inground.price
                       + num_in_concrete * cfg.install.inconcrete.price;
    const labour_y1    = duration_y1     * cfg.labour;

    // --------------------------------------------------
    // Renewal
    // --------------------------------------------------

    const duration_y2  = (num_in_ground  * cfg.renewal.inground.duration
                       +  num_in_concrete * cfg.renewal.inconcrete.duration)
                       / 60;
    const materials_y2 = num_in_ground   * cfg.renewal.inground.price
                       + num_in_concrete * cfg.renewal.inconcrete.price;
    const labour_y2    = duration_y2     * cfg.labour;

    // --------------------------------------------------
    // Monitoring
    // --------------------------------------------------

    const duration_yr  = (num_in_ground  * cfg.monitor.inground.duration
                       +  num_in_concrete * cfg.monitor.inconcrete.duration)
                       / 60;
    const labour_yr    = duration_yr * cfg.labour * cfg.monitor.visits;

    // --------------------------------------------------
    // Return
    // --------------------------------------------------

    const multiplier = Number($(`#multiplier`).val());

    return {
        install: {
            price: (materials_y1 + labour_y1 + labour_yr) * multiplier,
            duration: duration_y1
        },
        renewal: {
            price: (materials_y2 + labour_y2 + labour_yr) * multiplier,
            duration: duration_y2
        },
        stations: {
            in_ground: num_in_ground,
            in_concrete: num_in_concrete
        }
    }
}

export default function()
{
    const { install, renewal, stations } = calculate();

    if (stations.in_ground + stations.in_concrete == 0) {
        $('#install_overview').text(`$0`);
        $('#install').text(`$0`);
        $('#renewal').text(`$0`);
        $('#stations-soil').text(`0`);
        $('#stations-concrete').text(`0`);
        $('#duration').text(`0`);
        return;
    }

    $('#install_overview').text(`$${install.price.toFixed(0)}`);
    $('#install').text(`$${install.price.toFixed(0)}`);
    $('#renewal').text(`$${renewal.price.toFixed(0)}`);
    $('#stations-soil').text(stations.in_ground);
    $('#stations-concrete').text(stations.in_concrete);
    $('#duration').text(install.duration.toFixed(2));
}