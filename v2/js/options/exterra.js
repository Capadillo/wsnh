import cfg from "./config.json" with { type: "json" }

function onUpdate()
{
    // Station
    const s1 = Math.ceil($('#input-soft').val() / cfg.exterra.distance);
    const s2 = Math.ceil($('#input-hard').val() / cfg.exterra.distance);

    // Duration
    const d1i = cfg.exterra.ig.install.duration;
    const d2i = cfg.exterra.ic.install.duration;
    const d1r = cfg.exterra.ig.renewal.duration;
    const d2r = cfg.exterra.ic.renewal.duration;
    const d1m = cfg.exterra.ig.monitor.duration;
    const d2m = cfg.exterra.ic.monitor.duration;

    // Labour
    const lb = cfg.labour;
    const mv = cfg.exterra.visits;

    // Materials
    const m1i = cfg.exterra.ig.install.cost;
    const m2i = cfg.exterra.ic.install.cost;
    const m1r = cfg.exterra.ig.renewal.cost;
    const m2r = cfg.exterra.ic.renewal.cost;
    const m1m = cfg.exterra.ig.monitor.cost;
    const m2m = cfg.exterra.ic.monitor.cost;

    // Multiplier
    const mult = $('#multiplier').val()

    // --------------------------------------------------
    // Install
    // --------------------------------------------------

    let install = {};
    install.duration  = ((s1 * d1i) + (s2 * d2i)) / 60;
    install.labour    = install.duration * lb;
    install.materials = ((s1 * m1i) + (s2 * m2i));

    console.log('Install', install);

    // --------------------------------------------------
    // Renewal
    // --------------------------------------------------

    let renewal = {};
    renewal.duration  = ((s1 * d1r) + (s2 * d2r)) / 60;
    renewal.labour    = renewal.duration * lb;
    renewal.materials = ((s1 * m1r) + (s2 * m2r));

    console.log('Renewal', renewal);

    // --------------------------------------------------
    // Monitor
    // --------------------------------------------------

    let monitor = {};
    monitor.duration  = ((s1 * d1m) + (s2 * d2m)) / 60;
    monitor.labour    = (monitor.duration * lb) * mv;
    monitor.materials = ((s1 * m1m) + (s2 * m2m)) * mv;

    console.log('Monitor', monitor);

    // --------------------------------------------------
    // Totals
    // --------------------------------------------------

    return {
        install: {
            price: (install.labour + install.materials + monitor.labour + monitor.materials) * mult,
            duration: { initial: install.duration, monitor: monitor.duration }
        },
        renewal: {
            price: (renewal.labour + renewal.materials + monitor.labour + monitor.materials) * mult,
            duration: { initial: renewal.duration, monitor: monitor.duration }
        },
        stations: { inground: s1, inconcrete: s2 }
    }
}

export default function()
{
    console.clear();

    const { install, renewal, stations } = onUpdate();

    if (stations.inground + stations.inconcrete == 0) {
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
    $('#stations-soil').text(stations.inground);
    $('#stations-concrete').text(stations.inconcrete);
    
    if (install.duration.initial < 1) {
        $('#duration').text(`${Math.round(install.duration.initial * 60)} minutes`);
    } else if (install.duration.initial == 1) {
        $('#duration').text(`${(install.duration.initial).toFixed(1)} hour`);
    } else {
        $('#duration').text(`${(install.duration.initial).toFixed(1)} hours`);
    }

    if (install.duration.monitor < 1) {
        $('#mon_duration').text(`${Math.round(install.duration.monitor * 60)} minutes`);
    } else if (install.duration.monitor == 1) {
        $('#mon_duration').text(`${(install.duration.monitor).toFixed(1)} hour`);
    } else {
        $('#mon_duration').text(`${(install.duration.monitor).toFixed(1)} hours`);
    }
}