import { replace } from "../utils/replace.js";

// --------------------------------------------------
// Constants
// --------------------------------------------------

// install variables
const hourly_rate = 1400 / 8;     
const spacing     = 3.00;
const monitors    = 5.00;
const time        = {
    in_ground:   20 / 60,
    in_concrete: 30 / 60
};

// raw materials cost ($)
const station     = 10.00;
const core_cap    = 15.00;
const bait_box    = 10.00;
const interceptor =  0.40;
const focus       =  0.20;
const requiem     = 60.00;

// combined materials cost ($)
const cost = {
    in_ground:   station + focus,
    in_concrete: core_cap + (interceptor * 4) + focus,
    site_fee:    (requiem + hourly_rate) * 3
};

// --------------------------------------------------
// onUpdate
// --------------------------------------------------

function onUpdate(ui) {
    // stations
    const ig_stations = Math.ceil(ui.meters.soft / spacing);
    const ic_stations = Math.floor(ui.meters.hard / spacing);

    // duration
    const ig_duration = ig_stations * time.in_ground;
    const ic_duration = ic_stations * time.in_concrete;
    const duration    = Math.ceil(ig_duration + ic_duration);

    // materials cost
    const ig_materials = ig_stations * cost.in_ground;
    const ic_materials = ic_stations * cost.in_concrete;
    const materials    = Number(ig_materials + ic_materials);

    // labour cost
    const labour = Number((duration + monitors) * hourly_rate);

    // return data
    return {
        stations: {
            soft: ig_stations,
            hard: ic_stations
        },
        duration,
        renewal: Math.max((((labour + materials + cost.site_fee) * ui.multiplier) * 1.10) / 2, 1650).toFixed(2),
        total:   (((labour + materials + cost.site_fee) * ui.multiplier) * 1.10).toFixed(2)
    };
}

// --------------------------------------------------
// Proposal
// --------------------------------------------------

export default {
    id: "exterra",
    title: "Exterra",
    overview: "EXTERRA In-ground Stations are placed in the ground around the exterior of the structure at intervals not exceeding 3 meters. It may be necessary to form holes in slabs, pavers or asphalt to place In-concrete Stations. In addition, Above-ground Stations are placed directly on areas where live termites are located and considered to be feeding.<br>\n<br>\nEXTERRA Stations are inspected no more than 12 weeks apart. During inspections of unbaited stations, the timber Interceptors are visually inspected. When termite activity is discovered in a Station, REQUIEM Termite Bait is added. REQUIEM is placed in the vacant cavity at the center of the Station in contact with the Interceptors<br>\n<br>\nREQUIEM Baited Stations are re-inspected every 2-6 weeks. Stations are continually replenished in order to make sure that REQUIEM bait is always present in the Station.<br>\n<br>\nWhen termite feeding in an In-ground Station has been absent for a period of time, the Station (and any remaining bait) is removed. The Station is cleaned out and fresh Interceptors and Focus Termite Attractant is added.<br>\n<br>\nThis proposal is for a 12-month cover period only. The estimated cost for renewal, including a Timber Pest Inspection, is approximately ${[renewal]}.<br>\n<br>\n* Actual price may vary.",
    details: "Minimum EXTERRA Stations to be installed are:<br>\n<br>\n• {[num_soft]} In-ground Stations<br>\n• {[num_hard]} In-concrete Stations<br>\n<br>\nAbove-ground Stations are installed as required and is included in the above costs.<br>\n<br>\nThe total installation time is expected to be {[duration]} hours. Actual time may vary depending on the conditions at time of installation.<br>\n<br>\n* Access to eletricity and water may be required.",
    total: "${[total]}",

    update: function(ui) {
        const { stations, duration, renewal, total } = onUpdate(ui);

        return {
            overview: replace(this.overview, { renewal }),

            details: replace(this.details, {
                num_soft: stations.soft,
                num_hard: stations.hard,
                duration: duration 
            }),

            total: replace(this.total, { total })
        };
    }
};